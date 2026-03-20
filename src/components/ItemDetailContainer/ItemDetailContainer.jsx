import { useParams } from 'react-router-dom'
import { useAsyncData } from '../../hooks/useAsyncData'
import { getProductById } from '../../services/firebase/products'
import EmptyState from '../EmptyState/EmptyState'
import ItemDetail from '../ItemDetail/ItemDetail'
import Loader from '../Loader/Loader'
import './ItemDetailContainer.css'

function ItemDetailContainer() {
  const { idItem } = useParams()
  const {
    data: product,
    loading,
    error,
  } = useAsyncData({
    request: () => getProductById(idItem),
    requestKey: idItem,
    initialData: null,
    errorMessage: 'No pudimos cargar el detalle del producto.',
  })

  if (loading) {
    return (
      <section className="item-detail-container page-section">
        <Loader label="Cargando detalle del producto..." />
      </section>
    )
  }

  if (error || !product) {
    return (
      <section className="item-detail-container page-section">
        <EmptyState
          title="Producto no encontrado"
          message={error || 'No encontramos el producto solicitado.'}
          actionLabel="Volver al catalogo"
          actionTo="/"
        />
      </section>
    )
  }

  return (
    <section className="item-detail-container page-section">
      <ItemDetail item={product} />
    </section>
  )
}

export default ItemDetailContainer
