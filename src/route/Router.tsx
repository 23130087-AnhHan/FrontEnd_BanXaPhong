import { createBrowserRouter } from 'react-router-dom'
import Layout from './Layout'
import AccountGuard from './AccountGuard'
import ErrorPage from './Error'
import HomePage from '../pages/Home/HomePage'
import LoginPage from '../pages/Login/LoginPage'
import RegisterPage from '../pages/Register/RegisterPage'
import ForgotPasswordPage from '../pages/ForgotPassword/ForgotPasswordPage'
import ResetPasswordPage from '../pages/ResetPassword/ResetPasswordPage'
import AccountProfilePage from '../pages/AccountProfile/AccountProfilePage'
import ChangePasswordPage from '../pages/ChangePassword/ChangePasswordPage'
import AddressBookPage from '../pages/AddressBook/AddressBookPage'
import AddAddressPage from '../pages/AddAddress/AddAddressPage'
import MyOrdersPage from '../pages/MyOrders/MyOrdersPage'
import OrderDetailPage from '../pages/OrderDetail/OrderDetailPage'
import CartPage from '../pages/Cart/CartPage'
import CheckoutPage from '../pages/Checkout/CheckoutPage'
import OrderSuccessPage from '../pages/OrderSuccess/OrderSuccessPage'
import ProFilter from '../pages/ProductFilter/ProFilter'
import OfferProducts from '../pages/OfferPro/OfferProducts'
import ProductDetailPage from '../pages/ProductDetail/ProductDetailPage'
import HobbyProduct from '../pages/HobbyProduct/HobbyProduct'
import ContactPage from '../pages/Contact/ContactPage'
import OrderReturn from '../pages/OrderReturn/OrderReturn'
import CancelOrderPage from '../pages/CancelOrder/CancelOrderPage'
import OrderTrack from '../pages/OrderTrack/OrderTrack'
import OrderReviewPage from '../pages/OrderReview/OrderReviewPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'forgot-password', element: <ForgotPasswordPage /> },
      { path: 'reset-password', element: <ResetPasswordPage /> },
      { path: 'products', element: <ProFilter /> },
      { path: 'products/:productId', element: <ProductDetailPage /> },
      { path: 'offer', element: <OfferProducts /> },
      { path: 'hobby', element: <HobbyProduct /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'gio-hang', element: <CartPage /> },
      { element: <AccountGuard />, children: [
        { path: 'thanh-toan', element: <CheckoutPage /> },
        { path: 'dat-hang-thanh-cong', element: <OrderSuccessPage /> },
        { path: 'dat-hang-thanh-cong/:orderId', element: <OrderSuccessPage /> },
      ] },
      {
        path: 'tai-khoan', element: <AccountGuard />, children: [
          { index: true, element: <AccountProfilePage /> },
          { path: 'don-hang', element: <MyOrdersPage /> },
          { path: 'don-hang/chi-tiet', element: <OrderDetailPage /> },
          { path: 'don-hang/chi-tiet/:orderId', element: <OrderDetailPage /> },
          { path: 'don-hang/return', element: <OrderReturn /> },
          { path: 'don-hang/track', element: <OrderTrack /> },
          { path: 'don-hang/cancel', element: <CancelOrderPage /> },
          { path: 'don-hang/review', element: <OrderReviewPage /> },
          { path: 'doi-mat-khau', element: <ChangePasswordPage /> },
          { path: 'dia-chi', element: <AddressBookPage /> },
          { path: 'dia-chi/them-moi', element: <AddAddressPage /> },
          { path: 'dia-chi/:addressId/chinh-sua', element: <AddAddressPage /> },
        ],
      },
    ],
  },
])
