import {
  collection,
  doc,
  runTransaction,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from './config'

const PRODUCTS_COLLECTION = 'Products'
const ORDERS_COLLECTION = 'orders'

export async function createOrder({ buyer, items, total }) {
  const orderRef = doc(collection(db, ORDERS_COLLECTION))

  return runTransaction(db, async (transaction) => {
    for (const item of items) {
      const productRef = doc(db, PRODUCTS_COLLECTION, item.id)
      const productSnapshot = await transaction.get(productRef)

      if (!productSnapshot.exists()) {
        throw new Error(`El producto "${item.title}" ya no esta disponible.`)
      }

      const productData = productSnapshot.data()
      const currentStock = Math.max(Number(productData.stock ?? 0), 0)

      if (currentStock < item.quantity) {
        throw new Error(
          `Stock insuficiente para "${item.title}". Disponible: ${currentStock}.`,
        )
      }

      transaction.update(productRef, {
        stock: currentStock - item.quantity,
      })
    }

    transaction.set(orderRef, {
      buyer,
      items: items.map(({ id, title, price, quantity }) => ({
        id,
        title,
        price,
        quantity,
      })),
      total,
      createdAt: serverTimestamp(),
    })

    return orderRef.id
  })
}
