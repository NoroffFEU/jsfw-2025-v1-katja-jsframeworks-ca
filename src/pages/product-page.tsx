import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ErrorState from '../components/error-state'
import LoadingState from '../components/loading-state'
import { getProductById } from '../services/online-shop-api'
import { addToCart } from '../store/cart-store'
import { showToast } from '../ui/ui-toast/ui-toast-store'
import type { product } from '../types/product'

export default function ProductPage() {
  const { id } = useParams()
  const [item, setItem] = useState<product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  async function loadProduct(productId: string) {
    setIsLoading(true)
    setErrorMessage(null)

    try {
      const data = await getProductById(productId)
      setItem(data)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error'
      setErrorMessage(message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!id) return
    void loadProduct(id)
  }, [id])

  if (!id) return <ErrorState message="Missing product id." />
  if (isLoading) return <LoadingState />
  if (errorMessage) return <ErrorState message={errorMessage} onRetry={() => loadProduct(id)} />
  if (!item) return <ErrorState message="Product not found." />

  const isDiscounted = item.discountedPrice < item.price

  function handleAddToCart() {
    if (!item) return
    addToCart(item)
    showToast('Added to cart', 'success')
  }

  return (
    <div>
      <Link to="/" className="btn btn-link px-0">
        ← Back to shop
      </Link>

      <div className="row g-4">
        <div className="col-12 col-lg-6">
          <img
            src={item.image?.url}
            alt={item.image?.alt || item.title}
            className="img-fluid rounded border"
          />
        </div>

        <div className="col-12 col-lg-6">
          <h1 className="h3">{item.title}</h1>
          <p className="text-muted">{item.description}</p>

          <div className="mb-3">
            {isDiscounted ? (
              <>
                <span className="text-muted text-decoration-line-through me-2">{item.price}</span>
                <span className="fs-5 fw-semibold">{item.discountedPrice}</span>
              </>
            ) : (
              <span className="fs-5 fw-semibold">{item.price}</span>
            )}
          </div>

          <div className="small text-muted mb-3">Rating: {item.rating ?? 0}</div>

          <button type="button" className="btn btn-dark" onClick={handleAddToCart}>
            Add to cart
          </button>

          {item.tags?.length ? (
            <div className="mt-4">
              <div className="fw-semibold mb-2">Tags</div>
              <div className="d-flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span className="badge text-bg-light border" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          {item.reviews?.length ? (
            <div className="mt-4">
              <div className="fw-semibold mb-2">Reviews</div>
              <ul className="list-group">
                {item.reviews.map((review) => (
                  <li className="list-group-item" key={review.id}>
                    <div className="d-flex justify-content-between">
                      <strong>{review.username}</strong>
                      <span className="text-muted">Rating: {review.rating}</span>
                    </div>
                    <div>{review.description}</div>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
