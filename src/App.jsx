import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/Home/HomePage'
import LoginPage from './pages/Login/LoginPage'
import RegisterPage from './pages/Register/RegisterPage'
import ForgotPasswordPage from './pages/ForgotPassword/ForgotPasswordPage'
import ResetPasswordPage from './pages/ResetPassword/ResetPasswordPage'
import AccountProfilePage from './pages/AccountProfile/AccountProfilePage'
import ChangePasswordPage from './pages/ChangePassword/ChangePasswordPage'
import AddressBookPage from './pages/AddressBook/AddressBookPage'
import AddAddressPage from './pages/AddAddress/AddAddressPage'
import ProFilter from './pages/ProductFilter/ProFilter'
import OfferProducts from './pages/OfferPro/OfferProducts'

export default function App() {
  return (
    <BrowserRouter>
      <Header cartCount={2} />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/products" element={<ProFilter />} />
          <Route path="/offer" element={<OfferProducts />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/tai-khoan" element={<AccountProfilePage />} />
          <Route path="/tai-khoan/doi-mat-khau" element={<ChangePasswordPage />} />
          <Route path="/tai-khoan/dia-chi" element={<AddressBookPage />} />
          <Route path="/tai-khoan/dia-chi/them-moi" element={<AddAddressPage />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}
