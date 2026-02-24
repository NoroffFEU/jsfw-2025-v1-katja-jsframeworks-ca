import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import LoadingState from '../components/loading-state'
import ErrorState from '../components/error-state'
import { getProducts } from '../services/online-shop-api'
import type { product } from '../types/product'
import '../ui/ui-product-card.css'

export default function HomePage() {
  const [products, setProducts] = useState<product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  async function loadProducts() {
    setIsLoading(true)
    setErrorMessage(null)

    try {
      const data = await getProducts()
      setProducts(data)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error'
      setErrorMessage(message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    void loadProducts()
  }, [])

  return (
    <div>
      <h1 className="h3 mb-3">Shop</h1>

      {isLoading ? <LoadingState /> : null}
      {errorMessage ? <ErrorState message={errorMessage} onRetry={loadProducts} /> : null}

      {!isLoading && !errorMessage ? (
        <div className="row g-3">
          {products.map((item) => {
            const isDiscounted = item.discountedPrice < item.price
            const discountPercent = isDiscounted
              ? Math.round(((item.price - item.discountedPrice) / item.price) * 100)
              : 0

            return (
              <div className="col-12 col-sm-6 col-lg-4" key={item.id}>
                <div className="card h-100">
                <img
  src={item.image?.url}
  alt={item.image?.alt || item.title}
  className="card-img-top ui-product-image"
  loading="lazy"
/>

                  <div className="card-body d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-start gap-2">
                      <h2 className="h6 mb-1">{item.title}</h2>
                      {isDiscounted ? (
                        <span className="badge text-bg-danger">{discountPercent}%</span>
                      ) : null}
                    </div>

                    <div className="small text-muted mb-2">Rating: {item.rating ?? 0}</div>

                    <div className="mt-auto d-flex justify-content-between align-items-center">
                      <div>
                        {isDiscounted ? (
                          <>
                            <span className="text-muted text-decoration-line-through me-2">
                              {item.price}
                            </span>
                            <span className="fw-semibold">{item.discountedPrice}</span>
                          </>
                        ) : (
                          <span className="fw-semibold">{item.price}</span>
                        )}
                      </div>

                      <Link className="btn btn-sm btn-dark" to={`/product/${item.id}`}>
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}
