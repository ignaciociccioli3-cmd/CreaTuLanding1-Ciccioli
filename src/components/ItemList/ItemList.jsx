import Item from '../Item/Item'
import './ItemList.css'

function ItemList({ items }) {
  return (
    <div className="item-list">
      {items.map((item) => (
        <Item key={item.id} product={item} />
      ))}
    </div>
  )
}

export default ItemList
