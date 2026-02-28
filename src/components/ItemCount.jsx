import { useEffect, useState } from 'react'

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

function ItemCount({ stock, initial = 1, onAdd }) {
  const maxQty = Math.max(stock, 1)
  const [qty, setQty] = useState(clamp(initial, 1, maxQty))

  useEffect(() => {
    setQty(clamp(initial, 1, Math.max(stock, 1)))
  }, [initial, stock])

  const decrease = () => {
    setQty((previous) => clamp(previous - 1, 1, maxQty))
  }

  const increase = () => {
    setQty((previous) => clamp(previous + 1, 1, maxQty))
  }

  const handleAdd = () => {
    if (stock < 1) return
    onAdd(qty)
  }

  return (
    <div className="item-count">
      <div className="item-count__controls">
        <button type="button" onClick={decrease} disabled={qty <= 1}>
          -
        </button>
        <span>{qty}</span>
        <button type="button" onClick={increase} disabled={qty >= stock}>
          +
        </button>
      </div>
      <button
        type="button"
        className="item-count__add"
        onClick={handleAdd}
        disabled={stock < 1}
      >
        {stock > 0 ? 'Agregar al carrito' : 'Sin stock'}
      </button>
    </div>
  )
}

export default ItemCount
