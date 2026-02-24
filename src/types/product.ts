export interface productImage {
  url: string
  alt: string
}

export interface productReview {
  id: string
  username: string
  rating: number
  description: string
  created: string
}

export interface product {
  id: string
  title: string
  description: string
  image: productImage
  price: number
  discountedPrice: number
  rating: number
  tags?: string[]
  reviews?: productReview[]
}
