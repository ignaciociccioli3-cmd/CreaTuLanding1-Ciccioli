import { NavLink } from 'react-router-dom'
import { categories } from '../../data/categories'
import CartWidget from '../CartWidget/CartWidget'
import './NavBar.css'

function getLinkClass({ isActive }) {
  return `navbar__link${isActive ? ' is-active' : ''}`
}

function NavBar() {
  return (
    <header className="navbar">
      <div className="navbar__inner page-section">
        <div className="navbar__brand">
          <NavLink to="/" end className="navbar__title">
            Nexa
          </NavLink>
        </div>

        <nav className="navbar__links" aria-label="Categorias de productos">
          <NavLink to="/" end className={getLinkClass}>
            Catalogo
          </NavLink>
          {categories.map((category) => (
            <NavLink
              key={category.id}
              to={`/category/${category.id}`}
              className={getLinkClass}
            >
              {category.label}
            </NavLink>
          ))}
        </nav>

        <CartWidget />
      </div>
    </header>
  )
}

export default NavBar
