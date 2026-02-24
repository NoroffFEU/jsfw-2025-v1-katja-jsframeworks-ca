import type { product } from '../types/product'

export interface cartItem {
  id: string
  title: string
  imageUrl: string
  imageAlt: string
  price: number
  discountedPrice: number
  quantity: number
}

const storageKey = 'cart'
const cartEventName = 'cart:changed'

function notifyCartChanged() {
  window.dispatchEvent(new Event(cartEventName))
}

function readCart(): cartItem[] {
  const raw = localStorage.getItem(storageKey)
  if (!raw) return []

  try {
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return []
    return parsed as cartItem[]
  } catch {
    return []
  }
}

function writeCart(items: cartItem[]) {
  localStorage.setItem(storageKey, JSON.stringify(items))
  notifyCartChanged()
}

export function getCartItems(): cartItem[] {
  return readCart()
}

export function getCartCount(): number {
  return readCart().reduce((sum, item) => sum + item.quantity, 0)
}

export function onCartChanged(handler: () => void) {
  window.addEventListener(cartEventName, handler)
  return () => window.removeEventListener(cartEventName, handler)
}

export function addToCart(item: product) {
  const items = readCart()
  const existing = items.find((x) => x.id === item.id)

  if (existing) {
    existing.quantity += 1
    writeCart(items)
    return
  }

  const newItem: cartItem = {
    id: item.id,
    title: item.title,
    imageUrl: item.image?.url || '',
    imageAlt: item.image?.alt || item.title,
    price: item.price,
    discountedPrice: item.discountedPrice,
    quantity: 1,
  }

  writeCart([...items, newItem])
}

export function removeFromCart(id: string) {
  const items = readCart().filter((x) => x.id !== id)
  writeCart(items)
}

export function clearCart() {
  writeCart([])
}
