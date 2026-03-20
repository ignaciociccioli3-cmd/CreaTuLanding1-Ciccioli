import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer/Footer'
import Loader from './components/Loader/Loader'
import NavBar from './components/NavBar/NavBar'

const Cart = lazy(() => import('./components/Cart/Cart'))
const CheckoutForm = lazy(() => import('./components/CheckoutForm/CheckoutForm'))
const ItemDetailContainer = lazy(() =>
  import('./components/ItemDetailContainer/ItemDetailContainer'),
)
const ItemListContainer = lazy(() =>
  import('./components/ItemListContainer/ItemListContainer'),
)
const NotFound = lazy(() => import('./components/NotFound/NotFound'))

function App() {
  return (
    <div className="app">
      <NavBar />

      <main className="app__content">
        <Suspense fallback={<Loader label="Cargando vista..." />}>
          <Routes>
            <Route path="/" element={<ItemListContainer />} />
            <Route path="/category/:idCategory" element={<ItemListContainer />} />
            <Route path="/item/:idItem" element={<ItemDetailContainer />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<CheckoutForm />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </div>
  )
}

export default App
