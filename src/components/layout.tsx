import { useEffect, useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { getCartCount, onCartChanged } from '../store/cart-store'
import UiToast from '../ui/ui-toast/ui-toast'

export default function Layout() {
  const [cartCount, setCartCount] = useState(getCartCount())

  useEffect(() => {
    return onCartChanged(() => {
      setCartCount(getCartCount())
    })
  }, [])

  return (
    <>
      <header className="border-bottom bg-white">
        <nav className="navbar navbar-expand">
          <div className="container py-2">
            <NavLink className="navbar-brand fw-semibold" to="/">
              JSF Shop
            </NavLink>

            <div className="d-flex gap-3 align-items-center">
              <NavLink className="nav-link" to="/contact">
                Contact
              </NavLink>

              <NavLink className="btn btn-outline-dark" to="/cart">
                Cart <span className="badge bg-dark ms-2">{cartCount}</span>
              </NavLink>
            </div>
          </div>
        </nav>
      </header>

      <main className="container py-4">
        <Outlet />
      </main>

      <UiToast />
    </>
  )
}
