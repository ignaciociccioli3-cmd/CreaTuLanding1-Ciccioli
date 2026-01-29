function ItemListContainer({ greeting }) {
  return (
    <section className="item-list-container" aria-label="Listado de items">
      <p>{greeting}</p>
    </section>
  )
}

export default ItemListContainer
