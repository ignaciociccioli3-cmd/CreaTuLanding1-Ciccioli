import { Link } from 'react-router-dom'

function Item({ product }) {
  return (
    <article className="item-card">
      <img
        className="item-card__image"
        src={product.image}
        alt={product.title}
        loading="lazy"
      />
      <h2 className="item-card__title">{product.title}</h2>
      <p className="item-card__category">{product.category}</p>
      <p className="item-card__price">${product.price}</p>
      <p className="item-card__stock">Stock disponible: {product.stock}</p>
      <Link className="item-card__detail" to={`/item/${product.id}`}>
        Ver detalle
      </Link>
    </article>
  )
}

export default Item
