import { useState } from 'react'
import { Link } from 'react-router-dom'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight'
import { faEye } from '@fortawesome/free-solid-svg-icons/faEye'
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons/faEyeSlash'
import Icon from '../../../components/Icon'
import './RegisterForm.css'

export default function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    return (
        <section className="register-box" aria-labelledby="register-title">
            <h1 id="register-title" className="auth-title">Tạo tài khoản mới</h1>
            <p className="register-description">
                Cùng Saponi nâng niu làn da và đón nhận những ưu đãi dành riêng cho bạn.
            </p>

            <nav className="auth-tabs" aria-label="Tài khoản">
                <Link to="/login" className="auth-tab">Đăng nhập</Link>
                <button type="button" className="auth-tab active" aria-current="page">Đăng ký</button>
            </nav>

            <form className="register-form">
                <div className="register-field">
                    <label htmlFor="register-name">Họ và tên</label>
                    <input
                        id="register-name"
                        type="text"
                        autoComplete="name"
                        placeholder="Nhập họ và tên của bạn"
                    />
                </div>

                <div className="register-field">
                    <label htmlFor="register-email">Địa chỉ email</label>
                    <input
                        id="register-email"
                        type="email"
                        autoComplete="email"
                        placeholder="Nhập địa chỉ email của bạn"
                    />
                </div>

                <div className="register-field">
                    <label htmlFor="register-password">Mật khẩu</label>
                    <div className="register-password">
                        <input
                            id="register-password"
                            type={showPassword ? 'text' : 'password'}
                            autoComplete="new-password"
                            placeholder="Tạo mật khẩu"
                            aria-describedby="register-password-hint"
                        />
                        <button
                            type="button"
                            className="register-eye"
                            aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                            aria-controls="register-password"
                            onClick={() => setShowPassword((visible) => !visible)}
                        >
                            <Icon icon={showPassword ? faEyeSlash : faEye} />
                        </button>
                    </div>
                    <p id="register-password-hint" className="register-hint">
                        Tối thiểu 8 ký tự, bao gồm chữ hoa, chữ thường và số.
                    </p>
                </div>

                <div className="register-field">
                    <label htmlFor="register-confirm-password">Xác nhận mật khẩu</label>
                    <div className="register-password">
                        <input
                            id="register-confirm-password"
                            type={showConfirmPassword ? 'text' : 'password'}
                            autoComplete="new-password"
                            placeholder="Nhập lại mật khẩu"
                        />
                        <button
                            type="button"
                            className="register-eye"
                            aria-label={showConfirmPassword ? 'Ẩn mật khẩu xác nhận' : 'Hiện mật khẩu xác nhận'}
                            aria-controls="register-confirm-password"
                            onClick={() => setShowConfirmPassword((visible) => !visible)}
                        >
                            <Icon icon={showConfirmPassword ? faEyeSlash : faEye} />
                        </button>
                    </div>
                </div>

                <div className="register-consent">
                    <input id="register-terms" type="checkbox" />
                    <label htmlFor="register-terms">
                        Tôi đồng ý với <a href="/terms">Điều khoản sử dụng</a> và{' '}
                        <a href="/privacy">Chính sách bảo mật</a> của Saponi.
                    </label>
                </div>

                <button type="button" className="register-submit">
                    <span>Tạo tài khoản</span>
                    <Icon icon={faArrowRight} />
                </button>
            </form>

            <p className="register-login-prompt">
                Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link>
            </p>
        </section>
    )
}
