import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../hooks/useCart'
import { formatPrice } from '../../utils/formatPrice'
import ItemCount from '../ItemCount/ItemCount'
import './ItemDetail.css'

function ItemDetail({ item }) {
  const { addItem, getItemQuantity } = useCart()
  const quantityInCart = getItemQuantity(item.id)
  const availableStock = Math.max(item.stock - quantityInCart, 0)
  const [hasAdded, setHasAdded] = useState(quantityInCart > 0)
  const [feedback, setFeedback] = useState({
    message: '',
    tone: 'success',
  })

  useEffect(() => {
    setHasAdded(quantityInCart > 0)
  }, [quantityInCart])

  useEffect(() => {
    setFeedback({
      message: '',
      tone: 'success',
    })
  }, [item.id])

  const handleAdd = (quantity) => {
    try {
      addItem(item, quantity)
      setHasAdded(true)
      setFeedback({
        message: `Agregaste ${quantity} unidad(es) de "${item.title}" al carrito.`,
        tone: 'success',
      })
    } catch (error) {
      setFeedback({
        message: error.message || 'No pudimos agregar el producto al carrito.',
        tone: 'error',
      })
    }
  }

  return (
    <article className="item-detail section-card">
      <div className="item-detail__media">
        <img
          className="item-detail__image"
          src={item.image}
          alt={item.title}
          loading="lazy"
        />
      </div>

      <div className="item-detail__content">
        <p className="item-detail__eyebrow">{item.category}</p>
        <h1 className="section-title">{item.title}</h1>
        <p className="item-detail__description">{item.description}</p>

        <div className="item-detail__meta">
          <div className="item-detail__meta-card">
            <span>Precio</span>
            <strong>{formatPrice(item.price)}</strong>
          </div>
          <div className="item-detail__meta-card">
            <span>Stock actual</span>
            <strong>{item.stock}</strong>
          </div>
          <div className="item-detail__meta-card">
            <span>Disponibles ahora</span>
            <strong>{availableStock}</strong>
          </div>
        </div>

        {quantityInCart > 0 && (
          <p className="item-detail__info">
            Ya tenes {quantityInCart} unidad(es) de este producto en el carrito.
          </p>
        )}

        {feedback.message && (
          <p className={`item-detail__feedback is-${feedback.tone}`}>
            {feedback.message}
          </p>
        )}

        {hasAdded ? (
          <div className="item-detail__actions">
            <Link className="button" to="/cart">
              Ir al carrito
            </Link>
            <Link className="button button--secondary" to="/">
              Seguir comprando
            </Link>
          </div>
        ) : (
          <ItemCount stock={availableStock} initial={1} onAdd={handleAdd} />
        )}
      </div>
    </article>
  )
}

export default ItemDetail
