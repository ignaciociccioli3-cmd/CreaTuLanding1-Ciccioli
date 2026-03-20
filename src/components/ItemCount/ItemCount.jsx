import { useEffect, useState } from 'react'
import './ItemCount.css'

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

function ItemCount({ stock, initial = 1, onAdd }) {
  const maxQuantity = Math.max(stock, 1)
  const [quantity, setQuantity] = useState(clamp(initial, 1, maxQuantity))

  useEffect(() => {
    setQuantity(clamp(initial, 1, Math.max(stock, 1)))
  }, [initial, stock])

  const decrease = () => {
    setQuantity((currentQuantity) => clamp(currentQuantity - 1, 1, maxQuantity))
  }

  const increase = () => {
    setQuantity((currentQuantity) => clamp(currentQuantity + 1, 1, maxQuantity))
  }

  const handleAdd = () => {
    if (stock < 1) {
      return
    }

    onAdd(quantity)
  }

  return (
    <div className="item-count">
      <div className="item-count__controls" aria-label="Selector de cantidad">
        <button type="button" onClick={decrease} disabled={quantity <= 1}>
          -
        </button>
        <span className="item-count__value">{quantity}</span>
        <button type="button" onClick={increase} disabled={quantity >= stock}>
          +
        </button>
      </div>

      <button
        type="button"
        className="button item-count__button"
        onClick={handleAdd}
        disabled={stock < 1}
      >
        {stock > 0 ? 'Agregar al carrito' : 'Producto sin stock'}
      </button>

      <p className="item-count__hint">
        {stock > 0
          ? `Podes agregar entre 1 y ${stock} unidad(es).`
          : 'No hay stock disponible para este producto.'}
      </p>
    </div>
  )
}

export default ItemCount
