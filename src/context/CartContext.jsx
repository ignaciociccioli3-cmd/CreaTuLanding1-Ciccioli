import { useEffect, useState } from 'react'
import { CartContext } from './cartContext'

const STORAGE_KEY = 'nexa-wear-cart'

function readStoredCart() {
  if (typeof window === 'undefined') {
    return []
  }

  try {
    const rawCart = window.localStorage.getItem(STORAGE_KEY)
    if (!rawCart) {
      return []
    }

    const parsedCart = JSON.parse(rawCart)
    return Array.isArray(parsedCart) ? parsedCart : []
  } catch {
    return []
  }
}

function normalizeQuantity(quantity) {
  const parsedQuantity = Number(quantity)
  return Number.isNaN(parsedQuantity) ? 0 : Math.floor(parsedQuantity)
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(readStoredCart)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
    } catch {
      console.warn('No pudimos persistir el carrito en localStorage.')
    }
  }, [cart])

  const addItem = (item, quantity) => {
    const normalizedQuantity = normalizeQuantity(quantity)
    const maxStock = Math.max(Number(item?.stock ?? 0), 0)
    const existingQuantity = cart.find((cartItem) => cartItem.id === item.id)?.quantity ?? 0

    if (!item?.id) {
      throw new Error('No pudimos identificar el producto seleccionado.')
    }

    if (normalizedQuantity < 1) {
      throw new Error('La cantidad minima es 1 unidad.')
    }

    if (maxStock < 1) {
      throw new Error('Este producto no tiene stock disponible.')
    }

    if (existingQuantity + normalizedQuantity > maxStock) {
      throw new Error(`Solo hay ${maxStock} unidad(es) disponibles para este producto.`)
    }

    setCart((currentCart) => {
      const currentItem = currentCart.find((cartItem) => cartItem.id === item.id)

      if (!currentItem) {
        return [
          ...currentCart,
          {
            id: item.id,
            title: item.title,
            price: Number(item.price) || 0,
            quantity: normalizedQuantity,
            image: item.image,
            category: item.category,
          },
        ]
      }

      return currentCart.map((cartItem) =>
        cartItem.id === item.id
          ? {
              ...cartItem,
              quantity: cartItem.quantity + normalizedQuantity,
            }
          : cartItem,
      )
    })
  }

  const removeItem = (id) => {
    setCart((currentCart) => currentCart.filter((item) => item.id !== id))
  }

  const clearCart = () => {
    setCart([])
  }

  const isInCart = (id) => cart.some((item) => item.id === id)

  const getItemQuantity = (id) =>
    cart.find((item) => item.id === id)?.quantity ?? 0

  const getTotalItems = () =>
    cart.reduce((total, item) => total + Number(item.quantity || 0), 0)

  const getTotalPrice = () =>
    cart.reduce(
      (total, item) => total + Number(item.price || 0) * Number(item.quantity || 0),
      0,
    )

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        clearCart,
        isInCart,
        getItemQuantity,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
