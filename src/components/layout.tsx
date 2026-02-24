import { useEffect, useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { getCartCount, onCartChanged } from '../store/cart-store'
import UiToast from '../ui/ui-toast/ui-toast'
import '../ui/ui-layout.css'

export default function Layout() {
  const [cartCount, setCartCount] = useState(getCartCount())

  useEffect(() => {
    return onCartChanged(() => {
      setCartCount(getCartCount())
    })
  }, [])

  return (
    <div className="ui-page">
      <div className="ui-top-wrap">
        <header className="border-bottom bg-transparent">
          <nav className="navbar navbar-expand ui-navbar">
            <div className="container">
              <NavLink className="navbar-brand fw-semibold d-flex align-items-center gap-2" to="/">
                <img
                  className="ui-brand-logo"
                  src="/assets/images/little-joy-logotype.svg"
                  alt="Little Joy"
                />
              </NavLink>

              <div className="d-flex gap-3 align-items-center">
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>

                <NavLink className="nav-link" to="/contact">
                  Contact
                </NavLink>

                <NavLink className="btn btn-outline-dark" to="/cart" aria-label="Cart">
                  <span className="me-2">Cart</span>
                  <span className="badge bg-dark ui-cart-badge">{cartCount}</span>
                </NavLink>
              </div>
            </div>
          </nav>
        </header>

        {/* Hero illustration ONLY here */}
        <section className="ui-hero">
          <div className="container">
            <picture>
              <source
                media="(max-width: 767px)"
                srcSet="/assets/images/mobile-header-illustration.svg"
              />
              <img
                className="ui-hero-illustration"
                src="/assets/images/desktop-header-illustration.svg"
                alt=""
              />
            </picture>
          </div>
        </section>
      </div>

      <main className="container py-4">
        <Outlet />
      </main>

      <footer className="ui-footer">
        <div className="container">
          <picture>
            <source
              media="(max-width: 767px)"
              srcSet="/assets/images/mobile-footer-illustration.svg"
            />
            <img
              className="ui-footer-illustration"
              src="/assets/images/desktop-footer-illustration.svg"
              alt=""
            />
          </picture>

          <div className="row g-4 align-items-start">
            <div className="col-12 col-md-5">
              <div className="ui-footer-brand">
                <img
                  className="ui-footer-logo"
                  src="/assets/images/little-joy-logotype.svg"
                  alt="Little Joy"
                />
                <div>
                  <div className="fw-semibold">Little Joy</div>
                  <div className="text-muted">Easy gifts, fast choices</div>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-3">
              <ul className="ui-footer-links">
                <li>
                  <NavLink className="ui-link-muted" to="/">
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink className="ui-link-muted" to="/contact">
                    Contact
                  </NavLink>
                </li>
                <li>
                  <NavLink className="ui-link-muted" to="/cart">
                    Cart
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>

          <div className="ui-footer-bottom">
            This is a demo store built with the Noroff Online Shop API – © 2026 Little Joy
          </div>
        </div>
      </footer>
      <UiToast />
    </div>
  )
}
