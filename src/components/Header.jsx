import { NavLink } from 'react-router-dom'
import CartWidget from '../CartWidget'
import { categories } from '../data/categories'
import '../nav.css'

function getLinkClass({ isActive }) {
  return `navbar__link${isActive ? ' is-active' : ''}`
}

function Header({ cartCount = 0 }) {
  return (
    <header className="navbar">
      <NavLink to="/" className="navbar__title">
        Nexa Wear
      </NavLink>
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
      <CartWidget count={cartCount} />
    </header>
  )
}

export default Header
