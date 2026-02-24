import { createBrowserRouter } from 'react-router-dom'
import Layout from '../components/layout'
import HomePage from '../pages/home-page'
import ProductPage from '../pages/product-page'
import CartPage from '../pages/cart-page'
import CheckoutSuccessPage from '../pages/checkout-success-page'
import ContactPage from '../pages/contact-page'
import NotFoundPage from '../pages/not-found-page'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'product/:id', element: <ProductPage /> },
      { path: 'cart', element: <CartPage /> },
      { path: 'checkout-success', element: <CheckoutSuccessPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
