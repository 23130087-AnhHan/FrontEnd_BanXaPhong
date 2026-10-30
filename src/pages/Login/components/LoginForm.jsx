import { useState } from 'react'
import { Link } from 'react-router-dom'
import { faEye } from '@fortawesome/free-solid-svg-icons/faEye'
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons/faEyeSlash'
import Icon from '../../../components/Icon'
import './LoginForm.css'

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false)

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

            <form className="login-form">
                <div className="form-item">
                    <label>Địa chỉ email</label>
                    <input type="email" placeholder="Nhập địa chỉ email của bạn" />
                </div>

                <div className="form-item">
                    <label htmlFor="login-password">Mật khẩu</label>
                    <div className="password-box">
                        <input id="login-password" type={showPassword ? 'text' : 'password'} placeholder="Nhập mật khẩu" />
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
                </div>

                <div className="form-actions-row">
                    <label className="remember-me">
                        <input type="checkbox" defaultChecked />
                        <span>Ghi nhớ đăng nhập</span>
                    </label>
                    <a href="/forgot-password" className="forgot-link">Quên mật khẩu?</a>
                </div>

                <button type="submit" className="btn-submit">
                    Đăng nhập
                </button>
            </form>

            <p className="register-prompt">
                Bạn chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
            </p>
        </div>
    )
}
