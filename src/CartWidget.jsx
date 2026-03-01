import { Link } from 'react-router-dom'
import cartImage from '../Foto Carrito.jpeg'

function CartWidget({ count = 0 }) {
  return (
    <Link className="cart-widget" aria-label="Ir al carrito" to="/cart">
      <img
        className="cart-widget__icon"
        src={cartImage}
        alt="Carrito de compras"
      />
      <span className="cart-widget__count">{count}</span>
    </Link>
  )
}

export default CartWidget
