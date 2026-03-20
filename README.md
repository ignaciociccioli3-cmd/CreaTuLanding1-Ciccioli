# Nexa Wear

SPA e-commerce desarrollada con React + Vite + React Router + Firebase para la entrega final del curso.

## Stack

- React con JSX
- Vite
- React Router DOM
- Firebase SDK + Firestore
- CSS tradicional

## Funcionalidades

- Catalogo dinamico desde la coleccion `Products`
- Filtro por categoria con Firestore query
- Vista detalle por producto
- `ItemCount` con min/max segun stock
- Carrito global con `CartContext`
- `CartWidget` con total de unidades
- Checkout con validaciones
- Creacion de orden en `orders`
- Actualizacion de stock al confirmar la compra
- Loaders, estados vacios y mensajes de error
- Fallback de imagenes locales en `public/products`

## Rutas

- `/`: catalogo completo
- `/category/:idCategory`: productos por categoria
- `/item/:idItem`: detalle del producto
- `/cart`: carrito
- `/checkout`: formulario de compra
- `*`: not found

## Variables de entorno

Crea un archivo `.env` a partir de `.env.example`:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

La app no usa Analytics, por eso `VITE_FIREBASE_MEASUREMENT_ID` no es necesaria.

## Colecciones Firestore

La app usa estos nombres exactos:

- `Products`: fuente principal del catalogo
- `orders`: ordenes generadas desde checkout

Cada producto deberia tener al menos:

```js
{
  title: 'Remeras Basicas',
  description: 'Modelo clasico de manga corta, tela suave y calce regular.',
  price: 20000,
  category: 'remeras',
  stock: 20,
  image: '/products/RemeraBasica.jpg' // opcional, la app resuelve fallback si falta
}
```

## Imagenes de productos

- Las imagenes locales viven en `public/products/`
- Si Firestore trae `image` valida, se usa esa imagen
- Si `image` viene vacia o incompleta, la app intenta resolverla con el catalogo seed actual
- Si no encuentra coincidencia exacta, aplica un fallback por categoria

## Orden creada en Firestore

La orden se guarda con esta estructura:

```js
{
  buyer: {
    name,
    phone,
    email
  },
  items: [
    {
      id,
      title,
      price,
      quantity
    }
  ],
  total,
  createdAt: serverTimestamp()
}
```

## Estructura principal

```text
src/
  components/
  context/
  data/
  services/firebase/
  utils/
  App.jsx
  main.jsx
  index.css
public/
  products/
```

## Scripts

```bash
npm install
npm run dev
npm run build
```

## Notas de arquitectura

- `CartContext` centraliza la logica del carrito
- `ItemListContainer` y `ItemDetailContainer` manejan lectura, loading y errores
- `Cart` y `CartItem` separan listado y cada linea del carrito
- `CheckoutForm` valida datos y genera la orden
- La configuracion real de Firebase vive en [`src/services/firebase/config.js`](/Users/ignaciociccioli/Desktop/Nexa/src/services/firebase/config.js)
