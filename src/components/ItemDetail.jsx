import ItemCount from './ItemCount'

function ItemDetail({ item }) {
  const handleAdd = (qty) => {
    console.log('add', { id: item.id, qty })
  }

  return (
    <article className="item-detail">
      <h1 className="item-detail__title">{item.title}</h1>
      <p className="item-detail__description">{item.description}</p>
      <p className="item-detail__meta">
        <strong>Categoria:</strong> {item.category}
      </p>
      <p className="item-detail__meta">
        <strong>Precio:</strong> ${item.price}
      </p>
      <p className="item-detail__meta">
        <strong>Stock:</strong> {item.stock}
      </p>

      <ItemCount stock={item.stock} initial={1} onAdd={handleAdd} />
    </article>
  )
}

export default ItemDetail
