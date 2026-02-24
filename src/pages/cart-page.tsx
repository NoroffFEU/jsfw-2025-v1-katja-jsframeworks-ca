import { Link, useNavigate } from 'react-router-dom'
import {
  getCartItems,
  getCartTotal,
  removeFromCart,
  setCartItemQuantity,
} from '../store/cart-store'
import { showToast } from '../ui/ui-toast/ui-toast-store'
import '../ui/ui-cart.css'

export default function CartPage() {
  const navigate = useNavigate()
  const items = getCartItems()
  const total = getCartTotal()

  function handleDecrease(id: string, current: number) {
    setCartItemQuantity(id, current - 1)
    navigate(0)
  }

  function handleIncrease(id: string, current: number) {
    setCartItemQuantity(id, current + 1)
    navigate(0)
  }

  function handleRemove(id: string) {
    removeFromCart(id)
    showToast('Removed from cart', 'danger')
    navigate(0)
  }

  if (!items.length) {
    return (
      <div>
        <h1 className="h3 mb-2">Cart</h1>
        <p className="text-muted">Your cart is empty.</p>
        <Link className="btn btn-dark" to="/">
          Back to shop
        </Link>
      </div>
    )
  }

  return (
    <div>
      <h1 className="h3 mb-3">Cart</h1>

      <div className="row g-4">
        <div className="col-12 col-lg-8">
          <div className="list-group">
            {items.map((item) => (
              <div className="list-group-item" key={item.id}>
                <div className="d-flex gap-3">
                  <img
                    src={item.imageUrl}
                    alt={item.imageAlt}
                    className="rounded border ui-cart-thumb"
                  />

                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between align-items-start gap-2">
                      <div>
                        <div className="fw-semibold">{item.title}</div>
                        <div className="text-muted small">
                          Price: <span className="fw-semibold">{item.discountedPrice}</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleRemove(item.id)}
                      >
                        Remove
                      </button>
                    </div>

                    <div className="d-flex align-items-center gap-2 mt-2">
                      <button
                        type="button"
                        className="btn btn-outline-dark btn-sm"
                        onClick={() => handleDecrease(item.id, item.quantity)}
                      >
                        −
                      </button>

                      <span className="px-2">Qty: {item.quantity}</span>

                      <button
                        type="button"
                        className="btn btn-outline-dark btn-sm"
                        onClick={() => handleIncrease(item.id, item.quantity)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-12 col-lg-4">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between mb-2">
                <span className="fw-semibold">Total</span>
                <span className="fw-semibold">{total}</span>
              </div>

              <Link className="btn btn-dark w-100 mt-2" to="/checkout-success">
                Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
