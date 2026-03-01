import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ItemList from './components/ItemList'
import { getProducts, getProductsByCategory } from './data/mockApi'

function ItemListContainer({ greeting, getAvailableStock }) {
  const params = useParams()
  const idCategoria = params.idCategory
  const clave = idCategoria ?? 'all'
  const [estado, setEstado] = useState({
    clave: '',
    productos: [],
    error: '',
  })

  useEffect(() => {
    let requestActiva = true

    const promesa = idCategoria
      ? getProductsByCategory(idCategoria)
      : getProducts()

    promesa
      .then((respuesta) => {
        if (!requestActiva) return
        setEstado({
          clave,
          productos: respuesta,
          error: '',
        })
      })
      .catch(() => {
        if (!requestActiva) return
        setEstado({
          clave,
          productos: [],
          error: 'No pudimos cargar los productos.',
        })
      })

    return () => {
      requestActiva = false
    }
  }, [idCategoria, clave])

  const loading = estado.clave !== clave
  const productos = loading ? [] : estado.productos
  const error = loading ? '' : estado.error

  const productosConStock = productos.map((producto) => ({
    ...producto,
    baseStock: producto.stock,
    stock: getAvailableStock(producto),
  }))

  return (
    <section className="item-list-container" aria-label="Listado de items">
      <h1 className="item-list-container__title">{greeting}</h1>

      {loading && <p className="item-list-container__message">Cargando...</p>}

      {!loading && error && <p className="item-list-container__message">{error}</p>}

      {!loading && !error && productosConStock.length === 0 && (
        <p className="item-list-container__message">
          No hay productos para esta categoria.
        </p>
      )}

      {!loading && !error && productosConStock.length > 0 && (
        <ItemList items={productosConStock} />
      )}
    </section>
  )
}

export default ItemListContainer
