import { Link } from 'react-router-dom'

export default function notFoundPage() {
  return (
    <div>
      <h1 className="h3">Page not found</h1>
      <Link className="btn btn-dark mt-2" to="/">
        Back to shop
      </Link>
    </div>
  )
}
