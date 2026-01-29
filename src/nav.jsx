import './nav.css'
import CartWidget from './CartWidget'

function NavBar() {
  return (
    <header className="navbar">
      <div className="navbar__title">Nexa Studio</div>
      <nav className="navbar__links" aria-label="Navegación principal">
        <a href="#inicio">Inicio</a>
        <a href="#servicios">Servicios</a>
        <a href="#proyectos">Proyectos</a>
        <a href="#contacto">Contacto</a>
      </nav>
      <CartWidget />
    </header>
  )
}

export default NavBar
