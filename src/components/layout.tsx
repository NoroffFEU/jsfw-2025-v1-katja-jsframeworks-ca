import { NavLink, Outlet } from 'react-router-dom'

export default function layout() {
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

              <NavLink className="btn btn-outline-dark position-relative" to="/cart">
                Cart <span className="badge bg-dark ms-2">0</span>
              </NavLink>
            </div>
          </div>
        </nav>
      </header>

      <main className="container py-4">
        <Outlet />
      </main>
    </>
  )
}
