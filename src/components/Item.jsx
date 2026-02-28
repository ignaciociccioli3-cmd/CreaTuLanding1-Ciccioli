import { Link } from 'react-router-dom'

function Item({ product }) {
  return (
    <article className="item-card">
      <h2 className="item-card__title">{product.title}</h2>
      <p className="item-card__category">{product.category}</p>
      <p className="item-card__price">${product.price}</p>
      <Link className="item-card__detail" to={`/item/${product.id}`}>
        Ver detalle
      </Link>
    </article>
  )
}

export default Item
