import { useState } from 'react'
import { Link } from 'react-router-dom'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight'
import { faEye } from '@fortawesome/free-solid-svg-icons/faEye'
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons/faEyeSlash'
import Icon from '../../../components/Icon'
import './ResetPasswordForm.css'

export default function ResetPasswordForm() {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [error, setError] = useState('')

    function handleSubmit(e) {
        e.preventDefault()
        setError('')

        if (password.length < 8) {
            setError('Mật khẩu phải có tối thiểu 8 ký tự.')
            return
        }

        if (password !== confirmPassword) {
            setError('Mật khẩu xác nhận không khớp.')
            return
        }
    }

    return (
        <div className="reset-box">
            <Link to="/login" className="reset-back-link">
                <Icon icon={faArrowLeft} /> Quay lại đăng nhập
            </Link>

            <h2 className="auth-title">Đặt lại mật khẩu</h2>
            <p className="reset-desc">
                Tạo mật khẩu mới để tiếp tục chăm sóc làn da và lưu giữ những điều dịu lành cùng Saponi.
            </p>

            <form className="reset-form" onSubmit={handleSubmit}>
                <div className="form-item">
                    <label htmlFor="reset-password">Mật khẩu mới</label>
                    <div className="password-box">
                        <input
                            id="reset-password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Nhập mật khẩu mới"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            className="btn-eye"
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label="Ẩn hiện mật khẩu"
                        >
                            <Icon icon={showPassword ? faEyeSlash : faEye} />
                        </button>
                    </div>
                    <p className="form-hint">Tối thiểu 8 ký tự, bao gồm chữ hoa, chữ thường và số.</p>
                </div>

                <div className="form-item">
                    <label htmlFor="reset-confirm-password">Xác nhận mật khẩu mới</label>
                    <div className="password-box">
                        <input
                            id="reset-confirm-password"
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="Nhập lại mật khẩu mới"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            className="btn-eye"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            aria-label="Ẩn hiện mật khẩu xác nhận"
                        >
                            <Icon icon={showConfirmPassword ? faEyeSlash : faEye} />
                        </button>
                    </div>
                    <p className="form-hint">Để bảo vệ tài khoản, hãy chọn mật khẩu khác với mật khẩu bạn đã sử dụng trước đây.</p>
                </div>

                {error && <p className="form-error">{error}</p>}

                <button type="submit" className="btn-submit">
                    Đặt lại mật khẩu <Icon icon={faArrowRight} />
                </button>
            </form>
        </div>
    )
}
