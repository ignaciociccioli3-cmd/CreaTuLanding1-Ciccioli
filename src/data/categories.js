export const categories = [
  { id: 'remeras', label: 'Remeras' },
  { id: 'pantalones', label: 'Pantalones' },
  { id: 'camperas', label: 'Camperas' },
  { id: 'accesorios', label: 'Accesorios' },
]

export function getCategoryLabel(categoryId) {
  return categories.find((category) => category.id === categoryId)?.label ?? 'Catalogo'
}
