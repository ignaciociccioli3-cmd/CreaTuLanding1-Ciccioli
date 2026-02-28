import cartImage from '../Foto Carrito.jpeg'

function CartWidget() {
  return (
    <div className="cart-widget" aria-label="Carrito de compras">
      <img
        className="cart-widget__icon"
        src={cartImage}
        alt="Carrito de compras"
      />
      <span className="cart-widget__count">0</span>
    </div>
  )
}

export default CartWidget
