import { useState } from 'react'
import './App.css'
import Content from './components/Content'
import Footer from './components/Footer'
import Header from './components/Header'

function App() {
  const [cartItems, setCartItems] = useState([])

  const cartCount = cartItems.reduce((total, item) => total + item.qty, 0)
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.qty,
    0,
  )

  function getReservedQty(productId) {
    const selectedItem = cartItems.find((item) => item.id === productId)
    return selectedItem ? selectedItem.qty : 0
  }

  function getAvailableStock(product) {
    const baseStock = Number(product?.baseStock ?? product?.stock ?? 0)
    const reservedQty = getReservedQty(product.id)
    return Math.max(baseStock - reservedQty, 0)
  }

  const handleAddToCart = (item, qty) => {
    const normalizedQty = Number(qty)
    if (Number.isNaN(normalizedQty) || normalizedQty < 1) {
      alert('Cantidad invalida.')
      return
    }

    const availableStock = getAvailableStock(item)
    if (availableStock < normalizedQty) {
      alert(`Solo hay ${availableStock} unidad(es) disponible(s).`)
      return
    }

    setCartItems((previousItems) => {
      const existingItem = previousItems.find((product) => product.id === item.id)

      if (!existingItem) {
        return [
          ...previousItems,
          {
            id: item.id,
            title: item.title,
            price: item.price,
            qty: normalizedQty,
          },
        ]
      }

      return previousItems.map((product) =>
        product.id === item.id
          ? { ...product, qty: product.qty + normalizedQty }
          : product,
      )
    })

    alert(`Agregaste ${normalizedQty} unidad(es) de "${item.title}".`)
  }

  const handleRemoveFromCart = (productId) => {
    setCartItems((previousItems) =>
      previousItems.filter((item) => item.id !== productId),
    )
  }

  const handleClearCart = () => {
    setCartItems([])
  }

  return (
    <div className="app">
      <Header cartCount={cartCount} />
      <Content
        greeting="Bienvenido a Nexa Wear"
        getAvailableStock={getAvailableStock}
        onAddToCart={handleAddToCart}
        cartItems={cartItems}
        cartTotal={cartTotal}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />
      <Footer />
    </div>
  )
}

export default App
