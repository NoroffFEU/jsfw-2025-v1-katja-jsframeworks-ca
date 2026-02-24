import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import ErrorState from '../components/error-state'
import LoadingState from '../components/loading-state'
import { getProducts } from '../services/online-shop-api'
import type { product } from '../types/product'
import '../ui/ui-product-card.css'
import '../ui/ui-search.css'
import '../ui/ui-home.css'

export default function HomePage() {
  const [products, setProducts] = useState<product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [searchValue, setSearchValue] = useState('')

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

  const matches = useMemo(() => {
    const q = searchValue.trim().toLowerCase()
    if (!q) return []

    return products.filter((item) => item.title.toLowerCase().includes(q)).slice(0, 8)
  }, [products, searchValue])

  return (
    <div>
      <div className="ui-home-header">
        <div className="ui-home-title-wrap">
          <h1 className="h3 ui-page-title mb-0">Shop</h1>
          <div className="ui-home-subtitle">Browse gifts</div>
        </div>

        <div className="ui-home-search-wrap position-relative">
          <label className="form-label visually-hidden" htmlFor="search">
            Search products
          </label>

          <div className="input-group">
            <input
              className="form-control"
              id="search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              type="search"
              placeholder="Search"
            />
            <span className="input-group-text" aria-hidden="true">
              🔍
            </span>
          </div>

          {matches.length ? (
            <div className="list-group position-absolute w-100 mt-1 ui-search-dropdown">
              {matches.map((item) => (
                <Link
                  key={item.id}
                  className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                  to={`/product/${item.id}`}
                  onClick={() => setSearchValue('')}
                >
                  <span>{item.title}</span>
                  <span className="badge bg-dark">{item.rating ?? 0}</span>
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      </div>

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
                <div className="card h-100 ui-card ui-card-hover">
                  <img
                    src={item.image?.url}
                    alt={item.image?.alt || item.title}
                    className="card-img-top ui-product-image"
                    loading="lazy"
                  />

                  <div className="card-body d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-start gap-2">
                      <h2 className="ui-product-title">{item.title}</h2>
                      {isDiscounted ? (
                        <span className="ui-discount-badge">{discountPercent}%</span>
                      ) : null}
                    </div>

                    <div className="small text-muted mb-2">Rating: {item.rating ?? 0}</div>

                    <div className="mt-auto d-flex justify-content-between align-items-center">
                      <div className="ui-price-row">
                        {isDiscounted ? (
                          <>
                            <span className="ui-price-old">{item.price}</span>
                            <span className="ui-price-new">{item.discountedPrice}</span>
                          </>
                        ) : (
                          <span className="ui-price-new">{item.price}</span>
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
