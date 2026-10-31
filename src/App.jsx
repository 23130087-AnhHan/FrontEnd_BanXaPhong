import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import LoginPage from './pages/Login/LoginPage'
import RegisterPage from './pages/Register/RegisterPage'
import AccountProfilePage from './pages/AccountProfile/AccountProfilePage'
import ChangePasswordPage from './pages/ChangePassword/ChangePasswordPage'

export default function App() {
  return (
    <BrowserRouter>
      <Header cartCount={2} />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/tai-khoan" element={<AccountProfilePage />} />
          <Route path="/tai-khoan/doi-mat-khau" element={<ChangePasswordPage />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}
