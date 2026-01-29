import './App.css'
import NavBar from './nav'
import ItemListContainer from './ItemListContainer'

function App() {
  return (
    <div className="app">
      <NavBar />
      <ItemListContainer greeting="¡Bienvenido a Nexa Studio!" />
    </div>
  )
}

export default App