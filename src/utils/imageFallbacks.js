import {
  DEFAULT_IMAGE_BY_CATEGORY,
  DEFAULT_PRODUCT_IMAGE,
} from './productImages'

function normalizeValue(value) {
  return String(value ?? '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

function hasFileExtension(value) {
  return /\.[a-z0-9]+$/i.test(value)
}

function normalizeImagePath(image) {
  const rawImage = String(image ?? '')
    .trim()
    .replace(/^"+|"+$/g, '')

  if (!rawImage) {
    return ''
  }

  if (/^(https?:)?\/\//i.test(rawImage) || rawImage.startsWith('data:')) {
    return rawImage
  }

  if (rawImage.startsWith('/products/')) {
    return rawImage
  }

  if (rawImage.startsWith('products/')) {
    return `/${rawImage}`
  }

  if (rawImage.startsWith('/')) {
    return rawImage
  }

  const fileName = rawImage.split('/').pop()
  return hasFileExtension(fileName ?? '') ? `/products/${fileName}` : ''
}

export function resolveProductImage(product) {
  const directImage = normalizeImagePath(product?.image)

  if (directImage) {
    return directImage
  }

  const categoryKey = normalizeValue(product?.category)

  return DEFAULT_IMAGE_BY_CATEGORY[categoryKey] || DEFAULT_PRODUCT_IMAGE
}

export function normalizeProduct(rawProduct) {
  return {
    ...rawProduct,
    price: Number(rawProduct?.price) || 0,
    stock: Math.max(Number(rawProduct?.stock ?? 0), 0),
    image: resolveProductImage(rawProduct),
  }
}
