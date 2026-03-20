import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore'
import { normalizeProduct } from '../../utils/imageFallbacks'
import { db } from './config'

const PRODUCTS_COLLECTION = 'Products'
const FIRESTORE_TIMEOUT_MS = 10000

function withTimeout(promise, message) {
  return Promise.race([
    promise,
    new Promise((_, reject) => {
      window.setTimeout(() => {
        reject(new Error(message))
      }, FIRESTORE_TIMEOUT_MS)
    }),
  ])
}

function mapProduct(snapshot) {
  return normalizeProduct({
    id: snapshot.id,
    ...snapshot.data(),
  })
}

export async function getProducts() {
  const snapshot = await withTimeout(
    getDocs(collection(db, PRODUCTS_COLLECTION)),
    'Firestore no respondio a tiempo al cargar los productos.',
  )
  return snapshot.docs.map(mapProduct)
}

export async function getProductsByCategory(categoryId) {
  const productsQuery = query(
    collection(db, PRODUCTS_COLLECTION),
    where('category', '==', categoryId),
  )

  const snapshot = await withTimeout(
    getDocs(productsQuery),
    'Firestore no respondio a tiempo al filtrar la categoria.',
  )
  return snapshot.docs.map(mapProduct)
}

export async function getProductById(idItem) {
  const snapshot = await withTimeout(
    getDoc(doc(db, PRODUCTS_COLLECTION, idItem)),
    'Firestore no respondio a tiempo al cargar el detalle del producto.',
  )

  if (!snapshot.exists()) {
    return null
  }

  return mapProduct(snapshot)
}
