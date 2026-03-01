import { useMemo, useState } from 'react'
import { CartContext } from './cart-context'

function getReservedQtyFromCart(cartItems, productId) {
  const selectedItem = cartItems.find((item) => item.id === productId)
  return selectedItem ? selectedItem.qty : 0
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])

  const getReservedQty = (productId) => {
    return getReservedQtyFromCart(cartItems, productId)
  }

  const getAvailableStock = (product) => {
    const baseStock = Number(product?.baseStock ?? product?.stock ?? 0)
    const reservedQty = getReservedQty(product.id)
    return Math.max(baseStock - reservedQty, 0)
  }

  const addToCart = (product, qty) => {
    const normalizedQty = Number(qty)
    if (!product || Number.isNaN(normalizedQty) || normalizedQty < 1) {
      return { ok: false, message: 'Cantidad invalida.' }
    }

    const availableStock = getAvailableStock(product)
    if (availableStock < normalizedQty) {
      return {
        ok: false,
        message: `Solo hay ${availableStock} unidad(es) disponible(s).`,
      }
    }

    setCartItems((previousItems) => {
      const selectedItem = previousItems.find((item) => item.id === product.id)
      if (!selectedItem) {
        return [
          ...previousItems,
          {
            id: product.id,
            title: product.title,
            price: product.price,
            qty: normalizedQty,
          },
        ]
      }

      return previousItems.map((item) =>
        item.id === product.id
          ? {
              ...item,
              qty: item.qty + normalizedQty,
            }
          : item,
      )
    })

    return {
      ok: true,
      message: `Agregaste ${normalizedQty} unidad(es) de "${product.title}".`,
    }
  }

  const removeFromCart = (productId) => {
    setCartItems((previousItems) =>
      previousItems.filter((item) => item.id !== productId),
    )
  }

  const clearCart = () => {
    setCartItems([])
  }

  const cartCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.qty, 0),
    [cartItems],
  )

  const cartTotal = useMemo(
    () => cartItems.reduce((total, item) => total + item.price * item.qty, 0),
    [cartItems],
  )

  const contextValue = {
    cartItems,
    cartCount,
    cartTotal,
    addToCart,
    removeFromCart,
    clearCart,
    getReservedQty,
    getAvailableStock,
  }

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
}
