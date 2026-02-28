import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <section className="not-found">
      <h1>404</h1>
      <p>La ruta que intentaste abrir no existe.</p>
      <Link className="not-found__link" to="/">
        Volver al catalogo
      </Link>
    </section>
  )
}

export default NotFound
