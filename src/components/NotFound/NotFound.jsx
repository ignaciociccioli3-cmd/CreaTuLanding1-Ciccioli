import EmptyState from '../EmptyState/EmptyState'
import './NotFound.css'

function NotFound() {
  return (
    <section className="not-found page-section">
      <EmptyState
        title="404: pagina no encontrada"
        message="La ruta que intentaste abrir no existe dentro de Nexa."
        actionLabel="Volver al catalogo"
        actionTo="/"
      />
    </section>
  )
}

export default NotFound
