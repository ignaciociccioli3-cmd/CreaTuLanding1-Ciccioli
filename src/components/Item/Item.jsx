import { Link } from 'react-router-dom'
import { formatPrice } from '../../utils/formatPrice'
import './Item.css'

function formatCategoryLabel(category) {
  return String(category ?? '')
    .replace(/-/g, ' ')
    .replace(/^\w/, (letter) => letter.toUpperCase())
}

function Item({ product }) {
  return (
    <article className="item-card section-card">
      <div className="item-card__media">
        <img
          className="item-card__image"
          src={product.image}
          alt={product.title}
          loading="lazy"
        />
      </div>

      <div className="item-card__body">
        <p className="item-card__category">{formatCategoryLabel(product.category)}</p>
        <h2 className="item-card__title">{product.title}</h2>
        <p className="item-card__price">{formatPrice(product.price)}</p>
        <p className="item-card__stock">
          {product.stock > 0
            ? `Stock disponible: ${product.stock}`
            : 'Producto sin stock'}
        </p>
      </div>

      <Link className="button item-card__action" to={`/item/${product.id}`}>
        Ver detalle
      </Link>
    </article>
  )
}

export default Item
