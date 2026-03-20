import { Link } from 'react-router-dom'
import { useCart } from '../../hooks/useCart'
import './CartWidget.css'

function CartWidget() {
  const { getTotalItems } = useCart()
  const totalItems = getTotalItems()

  return (
    <Link
      className="cart-widget"
      to="/cart"
      aria-label={
        totalItems > 0
          ? `Ir al carrito. Tenes ${totalItems} productos.`
          : 'Ir al carrito'
      }
    >
      <span className="cart-widget__icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none">
          <path
            d="M3 4h2.1a1 1 0 0 1 .98.8l.34 1.7M8 13h8.6a1 1 0 0 0 .97-.76l1.35-5.24H6.42M9 18a1.25 1.25 0 1 1-2.5 0A1.25 1.25 0 0 1 9 18Zm8 0a1.25 1.25 0 1 1-2.5 0A1.25 1.25 0 0 1 17 18Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>

      {totalItems > 0 && <span className="cart-widget__count">{totalItems}</span>}
    </Link>
  )
}

export default CartWidget
