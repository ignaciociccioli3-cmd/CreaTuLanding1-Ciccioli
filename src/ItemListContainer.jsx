import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import ItemList from './components/ItemList'
import { getProducts, getProductsByCategory } from './data/mockApi'
import { useCart } from './context/useCart'

function ItemListContainer({ greeting }) {
  const { idCategory } = useParams()
  const { getAvailableStock } = useCart()
  const requestKey = idCategory ?? 'all'
  const [requestState, setRequestState] = useState({
    key: null,
    items: [],
    error: null,
  })

  useEffect(() => {
    let activeRequest = true

    const fetchProductsPromise = idCategory
      ? getProductsByCategory(idCategory)
      : getProducts()

    fetchProductsPromise
      .then((response) => {
        if (!activeRequest) return
        setRequestState({
          key: requestKey,
          items: response,
          error: null,
        })
      })
      .catch(() => {
        if (!activeRequest) return
        setRequestState({
          key: requestKey,
          items: [],
          error: 'No pudimos cargar los productos.',
        })
      })

    return () => {
      activeRequest = false
    }
  }, [idCategory, requestKey])

  const loading = requestState.key !== requestKey
  const items = useMemo(() => {
    if (loading) return []

    return requestState.items.map((product) => ({
      ...product,
      baseStock: product.stock,
      stock: getAvailableStock(product),
    }))
  }, [loading, requestState.items, getAvailableStock])
  const error = loading ? null : requestState.error

  return (
    <section className="item-list-container" aria-label="Listado de items">
      <h1 className="item-list-container__title">{greeting}</h1>

      {loading && <p className="item-list-container__message">Cargando...</p>}

      {!loading && error && <p className="item-list-container__message">{error}</p>}

      {!loading && !error && items.length === 0 && (
        <p className="item-list-container__message">
          No hay productos para esta categoria.
        </p>
      )}

      {!loading && !error && items.length > 0 && <ItemList items={items} />}
    </section>
  )
}

export default ItemListContainer
