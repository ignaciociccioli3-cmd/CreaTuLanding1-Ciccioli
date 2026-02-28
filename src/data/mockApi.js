import { products } from './products'

function randomDelay() {
  return Math.floor(Math.random() * 701) + 500
}

function resolveWithDelay(data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data)
    }, randomDelay())
  })
}

export function getProducts() {
  return resolveWithDelay([...products])
}

export function getProductsByCategory(idCategory) {
  const filteredProducts = products.filter(
    (product) => product.category === idCategory,
  )

  return resolveWithDelay(filteredProducts)
}

export function getProductById(idItem) {
  const numericId = Number(idItem)
  const selectedProduct = products.find(
    (product) => product.id === numericId || String(product.id) === String(idItem),
  )

  return resolveWithDelay(selectedProduct)
}
