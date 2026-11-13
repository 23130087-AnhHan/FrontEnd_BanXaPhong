import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { faEye } from '@fortawesome/free-solid-svg-icons/faEye'
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons/faEyeSlash'
import Icon from '../../../components/Icon'
import { dangNhap } from '../../../api/authApi'
import './LoginForm.css'

function kiemTraHopLe(email: string, matKhau: string): { loiEmail: string; loiMatKhau: string } {
    let loiEmail = ''
    let loiMatKhau = ''

    if (!email.trim()) {
        loiEmail = 'Vui lòng nhập email'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        loiEmail = 'Email không đúng định dạng'
    }

    if (!matKhau) {
        loiMatKhau = 'Vui lòng nhập mật khẩu'
    }

    return { loiEmail, loiMatKhau }
}

export default function LoginForm() {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [matKhau, setMatKhau] = useState('')
    const [ghiNhoToi, setGhiNhoToi] = useState(true)
    const [showPassword, setShowPassword] = useState(false)

    const [loiEmail, setLoiEmail] = useState('')
    const [loiMatKhau, setLoiMatKhau] = useState('')
    const [loiMayChu, setLoiMayChu] = useState('')
    const [dangXuLy, setDangXuLy] = useState(false)

    async function xuLyDangNhap(e: React.FormEvent) {
        e.preventDefault()

        const { loiEmail: errEmail, loiMatKhau: errMatKhau } = kiemTraHopLe(email, matKhau)
        setLoiEmail(errEmail)
        setLoiMatKhau(errMatKhau)

        if (errEmail || errMatKhau) return

        setLoiMayChu('')
        setDangXuLy(true)

        try {
            const ketQua = await dangNhap(email.trim(), matKhau)

            if (!ketQua.thanhCong) {
                setLoiMayChu(ketQua.thongBaoLoi ?? 'Đăng nhập thất bại')
                return
            }

            if (ghiNhoToi) {
                localStorage.setItem('nguoiDungHienTai', JSON.stringify(ketQua.nguoiDung))
            } else {
                sessionStorage.setItem('nguoiDungHienTai', JSON.stringify(ketQua.nguoiDung))
            }

            navigate('/')
        } catch {
            setLoiMayChu('Không thể kết nối đến máy chủ, vui lòng thử lại')
        } finally {
            setDangXuLy(false)
        }
    }

    return (
        <div className="login-box">
            <h2 className="auth-title">Chào mừng bạn trở lại</h2>
            <p className="login-desc">
                Đăng nhập để theo dõi đơn hàng và lưu lại những sản phẩm dịu lành bạn yêu thích.
            </p>

            <nav className="auth-tabs" aria-label="Tài khoản">
                <button type="button" className="auth-tab active" aria-current="page">Đăng nhập</button>
                <Link to="/register" className="auth-tab">Đăng ký</Link>
            </nav>

            <form className="login-form" onSubmit={xuLyDangNhap} noValidate>
                <div className="form-item">
                    <label htmlFor="login-email">Địa chỉ email</label>
                    <input
                        id="login-email"
                        type="email"
                        autoComplete="email"
                        placeholder="Nhập địa chỉ email của bạn"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        aria-invalid={!!loiEmail}
                        aria-describedby={loiEmail ? 'loi-email' : undefined}
                    />
                    {loiEmail && <p id="loi-email" className="login-error">{loiEmail}</p>}
                </div>

                <div className="form-item">
                    <label htmlFor="login-password">Mật khẩu</label>
                    <div className="password-box">
                        <input
                            id="login-password"
                            type={showPassword ? 'text' : 'password'}
                            autoComplete="current-password"
                            placeholder="Nhập mật khẩu"
                            value={matKhau}
                            onChange={(e) => setMatKhau(e.target.value)}
                            aria-invalid={!!loiMatKhau}
                            aria-describedby={loiMatKhau ? 'loi-mat-khau' : undefined}
                        />
                        <button
                            type="button"
                            className="btn-eye"
                            aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                            aria-controls="login-password"
                            onClick={() => setShowPassword((visible) => !visible)}
                        >
                            <Icon icon={showPassword ? faEyeSlash : faEye} />
                        </button>
                    </div>
                    {loiMatKhau && <p id="loi-mat-khau" className="login-error">{loiMatKhau}</p>}
                </div>

                <div className="form-actions-row">
                    <label className="remember-me">
                        <input
                            type="checkbox"
                            checked={ghiNhoToi}
                            onChange={(e) => setGhiNhoToi(e.target.checked)}
                        />
                        <span>Ghi nhớ đăng nhập</span>
                    </label>
                    <Link to="/forgot-password" className="forgot-link">Quên mật khẩu?</Link>
                </div>

                {loiMayChu && (
                    <p className="login-error login-error--server" role="alert">{loiMayChu}</p>
                )}

                <button type="submit" className="btn-submit" disabled={dangXuLy}>
                    {dangXuLy ? 'Đang đăng nhập...' : 'Đăng nhập'}
                </button>
            </form>

            <p className="register-prompt">
                Bạn chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
            </p>
        </div>
    )
}
