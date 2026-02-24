import { createBrowserRouter } from 'react-router-dom'
import layout from '../components/layout'
import homePage from '../pages/home-page'
import productPage from '../pages/product-page'
import cartPage from '../pages/cart-page'
import checkoutSuccessPage from '../pages/checkout-success-page'
import contactPage from '../pages/contact-page'
import notFoundPage from '../pages/not-found-page'

export const router = createBrowserRouter([
  {
    path: '/',
    element: layout(),
    children: [
      { index: true, element: homePage() },
      { path: 'product/:id', element: productPage() },
      { path: 'cart', element: cartPage() },
      { path: 'checkout-success', element: checkoutSuccessPage() },
      { path: 'contact', element: contactPage() },
      { path: '*', element: notFoundPage() },
    ],
  },
])
