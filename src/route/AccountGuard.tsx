import { useEffect, useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { layNguoiDungHienTai } from '../api/authApi'

export default function AccountGuard() {
  const [user, setUser] = useState(layNguoiDungHienTai)
  const location = useLocation()

  useEffect(() => {
    const updateUser = () => setUser(layNguoiDungHienTai())
    window.addEventListener('auth-change', updateUser)
    window.addEventListener('storage', updateUser)
    return () => {
      window.removeEventListener('auth-change', updateUser)
      window.removeEventListener('storage', updateUser)
    }
  }, [])

  return user ? <Outlet key={user.id} /> : <Navigate to="/login" replace state={{ from: location.pathname + location.search }} />
}
