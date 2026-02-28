import { Link, NavLink } from 'react-router-dom'
import './nav.css'
import CartWidget from './CartWidget'
import { categories } from './data/categories'

function getLinkClass({ isActive }) {
  return `navbar__link${isActive ? ' is-active' : ''}`
}

function NavBar() {
  return (
    <header className="navbar">
      <Link to="/" className="navbar__title">
        Nexa Studio
      </Link>
      <nav className="navbar__links" aria-label="Navegación principal">
        <NavLink to="/" end className={getLinkClass}>
          Todas
        </NavLink>
        {categories.map((category) => (
          <NavLink
            key={category.id}
            to={`/products/${category.id}`}
            className={getLinkClass}
          >
            {category.label}
          </NavLink>
        ))}
      </nav>
      <CartWidget />
    </header>
  )
}

export default NavBar
