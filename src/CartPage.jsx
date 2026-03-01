import { Link } from 'react-router-dom'

function CartPage({ cartItems, cartTotal, onRemoveItem, onClearCart }) {

  if (cartItems.length === 0) {
    return (
      <section className="cart-page">
        <h1 className="cart-page__title">Tu carrito</h1>
        <p className="cart-page__message">Todavia no agregaste productos.</p>
        <Link className="cart-page__cta" to="/">
          Ir al catalogo
        </Link>
      </section>
    )
  }

  return (
    <section className="cart-page">
      <h1 className="cart-page__title">Tu carrito</h1>

      <div className="cart-page__list">
        {cartItems.map((item) => (
          <article key={item.id} className="cart-page__item">
            <div>
              <h2>{item.title}</h2>
              <p>
                ${item.price} x {item.qty} = ${item.price * item.qty}
              </p>
            </div>
            <button
              type="button"
              className="cart-page__remove"
              onClick={() => onRemoveItem(item.id)}
            >
              Eliminar
            </button>
          </article>
        ))}
      </div>

      <p className="cart-page__total">
        <strong>Total:</strong> ${cartTotal}
      </p>

      <div className="cart-page__actions">
        <button type="button" className="cart-page__clear" onClick={onClearCart}>
          Vaciar carrito
        </button>
        <Link className="cart-page__cta" to="/">
          Seguir comprando
        </Link>
      </div>
    </section>
  )
}

export default CartPage
