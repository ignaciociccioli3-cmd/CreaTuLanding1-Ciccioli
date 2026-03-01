import { Route, Routes } from 'react-router-dom'
import './App.css'
import NavBar from './nav'
import ItemListContainer from './ItemListContainer'
import ItemDetailContainer from './ItemDetailContainer'
import NotFound from './NotFound'
import CartPage from './CartPage'
import { useCart } from './context/useCart'

function App() {
  const { cartCount, addToCart } = useCart()

  const handleAddToCart = (item, qty) => {
    const result = addToCart(item, qty)
    alert(result.message)
  }

  return (
    <div className="app">
      <NavBar cartCount={cartCount} />
      <main className="app__content">
        <Routes>
          <Route
            path="/"
            element={<ItemListContainer greeting="Bienvenido a Nexa Wear" />}
          />
          <Route
            path="/products/:idCategory"
            element={<ItemListContainer greeting="Bienvenido a Nexa Wear" />}
          />
          <Route
            path="/item/:idItem"
            element={<ItemDetailContainer onAddToCart={handleAddToCart} />}
          />
          <Route path="/cart" element={<CartPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
