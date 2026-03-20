import { useCart } from '../../hooks/useCart'
import { formatPrice } from '../../utils/formatPrice'
import './CartItem.css'

function CartItem({ item }) {
  const { removeItem } = useCart()
  const subtotal = item.price * item.quantity

  return (
    <article className="cart-item section-card">
      <img className="cart-item__image" src={item.image} alt={item.title} />

      <div className="cart-item__content">
        <h2 className="cart-item__title">{item.title}</h2>
        <p className="cart-item__meta">Cantidad: {item.quantity}</p>
        <p className="cart-item__meta">Precio unitario: {formatPrice(item.price)}</p>
        <p className="cart-item__subtotal">Subtotal: {formatPrice(subtotal)}</p>
      </div>

      <button
        type="button"
        className="button button--ghost cart-item__remove"
        onClick={() => removeItem(item.id)}
      >
        Eliminar
      </button>
    </article>
  )
}

export default CartItem
