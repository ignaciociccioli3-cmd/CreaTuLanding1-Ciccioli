import { useParams } from 'react-router-dom'
import { getCategoryLabel } from '../../data/categories'
import { useAsyncData } from '../../hooks/useAsyncData'
import {
  getProducts,
  getProductsByCategory,
} from '../../services/firebase/products'
import EmptyState from '../EmptyState/EmptyState'
import ItemList from '../ItemList/ItemList'
import Loader from '../Loader/Loader'
import PageHeader from '../PageHeader/PageHeader'
import './ItemListContainer.css'

function ItemListContainer() {
  const { idCategory } = useParams()
  const {
    data: products,
    loading,
    error,
  } = useAsyncData({
    request: () =>
      idCategory ? getProductsByCategory(idCategory) : getProducts(),
    requestKey: idCategory ?? 'all',
    initialData: [],
    errorMessage: 'No pudimos cargar el catalogo desde Firestore.',
  })

  const sectionTitle = idCategory
    ? `Coleccion ${getCategoryLabel(idCategory)}`
    : 'Catalogo Nexa Wear'

  return (
    <section className="item-list-container page-section">
      <PageHeader eyebrow="Nexa Wear Store" title={sectionTitle} />

      {loading && <Loader label="Cargando productos..." />}

      {!loading && error && (
        <EmptyState
          title="Error de carga"
          message={error}
          actionLabel="Reintentar desde catalogo"
          actionTo="/"
        />
      )}

      {!loading && !error && products.length === 0 && (
        <EmptyState
          title="No encontramos productos"
          message={
            idCategory
              ? 'Todavia no hay productos cargados para esta categoria en Firestore.'
              : 'La coleccion Products esta vacia. Podes poblarla con el helper de seed.'
          }
          actionLabel="Ver catalogo completo"
          actionTo="/"
        />
      )}

      {!loading && !error && products.length > 0 && <ItemList items={products} />}
    </section>
  )
}

export default ItemListContainer
