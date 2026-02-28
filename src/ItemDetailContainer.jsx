import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ItemDetail from './components/ItemDetail'
import { getProductById } from './data/mockApi'

function ItemDetailContainer() {
  const { idItem } = useParams()
  const requestKey = idItem ?? ''
  const [requestState, setRequestState] = useState({
    key: null,
    item: null,
    error: null,
  })

  useEffect(() => {
    let activeRequest = true

    getProductById(idItem)
      .then((response) => {
        if (!activeRequest) return
        if (!response) {
          setRequestState({
            key: requestKey,
            item: null,
            error: 'No encontramos el producto solicitado.',
          })
          return
        }
        setRequestState({
          key: requestKey,
          item: response,
          error: null,
        })
      })
      .catch(() => {
        if (!activeRequest) return
        setRequestState({
          key: requestKey,
          item: null,
          error: 'No pudimos cargar el detalle del producto.',
        })
      })

    return () => {
      activeRequest = false
    }
  }, [idItem, requestKey])

  const loading = requestState.key !== requestKey
  const item = loading ? null : requestState.item
  const error = loading ? null : requestState.error

  if (loading) {
    return <p className="item-detail-container__message">Cargando detalle...</p>
  }

  if (error || !item) {
    return (
      <section className="item-detail-container">
        <p className="item-detail-container__message">
          {error || 'No encontramos el producto solicitado.'}
        </p>
        <Link className="item-detail-container__back" to="/">
          Volver al catalogo
        </Link>
      </section>
    )
  }

  return (
    <section className="item-detail-container">
      <ItemDetail item={item} />
    </section>
  )
}

export default ItemDetailContainer
