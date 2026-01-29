import cartImage from '../Foto Carrito.jpeg'

function CartWidget() {
  return (
    <div className="cart-widget">
      <img
        className="cart-widget__icon"
        src={cartImage}
        alt="Carrito de compras"
      />
    </div>
  )
}

export default CartWidget
