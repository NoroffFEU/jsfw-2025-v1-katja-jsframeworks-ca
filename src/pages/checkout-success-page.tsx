import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { clearCart } from '../store/cart-store'

export default function CheckoutSuccessPage() {
  useEffect(() => {
    clearCart()
  }, [])

  return (
    <div className="text-center">
      <h1 className="h3 mb-2">Order complete ✅</h1>
      <p className="text-muted mb-4">Thank you! Your cart has been cleared.</p>

      <Link className="btn btn-dark" to="/">
        Back to shop
      </Link>
    </div>
  )
}
