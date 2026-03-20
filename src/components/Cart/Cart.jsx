import { Link } from 'react-router-dom'
import { useCart } from '../../hooks/useCart'
import { formatPrice } from '../../utils/formatPrice'
import CartItem from '../CartItem/CartItem'
import EmptyState from '../EmptyState/EmptyState'
import PageHeader from '../PageHeader/PageHeader'
import './Cart.css'

function Cart() {
  const { cart, clearCart, getTotalItems, getTotalPrice } = useCart()
  const totalItems = getTotalItems()
  const totalPrice = getTotalPrice()

  if (cart.length === 0) {
    return (
      <section className="cart page-section">
        <EmptyState
          title="Tu carrito esta vacio"
          message="Todavia no agregaste productos. Volve al catalogo para empezar una compra."
          actionLabel="Ir al catalogo"
          actionTo="/"
        />
      </section>
    )
  }

  return (
    <section className="cart page-section">
      <PageHeader
        eyebrow="Carrito"
        title="Revisa tu compra"
        subtitle={`${totalItems} unidad(es) seleccionadas en Nexa.`}
      />

      <div className="cart__layout">
        <div className="cart__list">
          {cart.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <aside className="cart__summary section-card">
          <h2 className="cart__summary-title">Resumen</h2>
          <div className="cart__summary-row">
            <span>Unidades</span>
            <strong>{totalItems}</strong>
          </div>
          <div className="cart__summary-row">
            <span>Total</span>
            <strong>{formatPrice(totalPrice)}</strong>
          </div>

          <div className="cart__actions">
            <button
              type="button"
              className="button button--danger"
              onClick={clearCart}
            >
              Vaciar carrito
            </button>
            <Link className="button" to="/checkout">
              Ir al checkout
            </Link>
            <Link className="button button--ghost" to="/">
              Seguir comprando
            </Link>
          </div>
        </aside>
      </div>
    </section>
  )
}

export default Cart
