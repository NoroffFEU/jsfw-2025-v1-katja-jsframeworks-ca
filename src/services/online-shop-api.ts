import { apiGet } from './api-client'
import type { product } from '../types/product'

export function getProducts() {
  return apiGet<product[]>('/online-shop')
}

export function getProductById(id: string) {
  return apiGet<product>(`/online-shop/${id}`)
}
