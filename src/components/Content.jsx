import { Route, Routes } from 'react-router-dom'
import CartPage from '../CartPage'
import ItemDetailContainer from '../ItemDetailContainer'
import ItemListContainer from '../ItemListContainer'
import NotFound from '../NotFound'

function Content({
  greeting,
  getAvailableStock,
  onAddToCart,
  cartItems,
  cartTotal,
  onRemoveItem,
  onClearCart,
}) {
  return (
    <main className="app__content">
      <Routes>
        <Route
          path="/"
          element={
            <ItemListContainer
              greeting={greeting}
              getAvailableStock={getAvailableStock}
            />
          }
        />
        <Route
          path="/products/:idCategory"
          element={
            <ItemListContainer
              greeting={greeting}
              getAvailableStock={getAvailableStock}
            />
          }
        />
        <Route
          path="/item/:idItem"
          element={
            <ItemDetailContainer
              onAddToCart={onAddToCart}
              getAvailableStock={getAvailableStock}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <CartPage
              cartItems={cartItems}
              cartTotal={cartTotal}
              onRemoveItem={onRemoveItem}
              onClearCart={onClearCart}
            />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  )
}

export default Content
