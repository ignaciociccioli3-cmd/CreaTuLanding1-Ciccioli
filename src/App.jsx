import { Route, Routes } from 'react-router-dom'
import './App.css'
import NavBar from './nav'
import ItemListContainer from './ItemListContainer'
import ItemDetailContainer from './ItemDetailContainer'
import NotFound from './NotFound'

function App() {
  return (
    <div className="app">
      <NavBar />
      <main className="app__content">
        <Routes>
          <Route
            path="/"
            element={<ItemListContainer greeting="Bienvenido a Nexa Studio" />}
          />
          <Route
            path="/products/:idCategory"
            element={<ItemListContainer greeting="Bienvenido a Nexa Studio" />}
          />
          <Route path="/item/:idItem" element={<ItemDetailContainer />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
