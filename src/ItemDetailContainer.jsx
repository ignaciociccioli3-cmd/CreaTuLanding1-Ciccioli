import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ItemDetail from './components/ItemDetail'
import { getProductById } from './data/mockApi'

function ItemDetailContainer({ onAddToCart, getAvailableStock }) {
  const params = useParams()
  const idProducto = params.idItem
  const clave = idProducto ?? ''
  const [estado, setEstado] = useState({
    clave: '',
    producto: null,
    error: '',
  })

  useEffect(() => {
    let requestActiva = true

    getProductById(idProducto)
      .then((respuesta) => {
        if (!requestActiva) return
        if (!respuesta) {
          setEstado({
            clave,
            producto: null,
            error: 'No encontramos el producto solicitado.',
          })
          return
        }
        setEstado({
          clave,
          producto: respuesta,
          error: '',
        })
      })
      .catch(() => {
        if (!requestActiva) return
        setEstado({
          clave,
          producto: null,
          error: 'No pudimos cargar el detalle del producto.',
        })
      })

    return () => {
      requestActiva = false
    }
  }, [idProducto, clave])

  const loading = estado.clave !== clave
  const producto = loading ? null : estado.producto
  const errorVisible = loading ? '' : estado.error

  const productoConStock =
    loading || !producto
      ? null
      : {
          ...producto,
          baseStock: producto.stock,
          stock: getAvailableStock(producto),
        }

  if (loading) {
    return <p className="item-detail-container__message">Cargando detalle...</p>
  }

  if (errorVisible || !productoConStock) {
    return (
      <section className="item-detail-container">
        <p className="item-detail-container__message">
          {errorVisible || 'No encontramos el producto solicitado.'}
        </p>
        <Link className="item-detail-container__back" to="/">
          Volver al catalogo
        </Link>
      </section>
    )
  }

  return (
    <section className="item-detail-container">
      <ItemDetail item={productoConStock} onAddToCart={onAddToCart} />
    </section>
  )
}

export default ItemDetailContainer
