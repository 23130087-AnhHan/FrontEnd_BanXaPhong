import { useState, type FormEvent } from 'react'
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
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [error, setError] = useState('')

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
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

        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
            setIsSuccess(true)
        }, 500)
    }

    if (isSuccess) {
        return (
            <div className="reset-box">
                <h2 className="auth-title">Đặt lại mật khẩu thành công</h2>
                <p className="reset-desc">
                    Mật khẩu của bạn đã được cập nhật. Bạn có thể đăng nhập bằng mật khẩu mới để tiếp tục hành trình dịu lành cùng Saponi.
                </p>

                <div className="reset-ready-card">
                    <p className="ready-title">Tài khoản của bạn đã sẵn sàng</p>
                    <p className="ready-desc">Hãy giữ mật khẩu mới an toàn và không chia sẻ với bất kỳ ai.</p>
                </div>

                <Link to="/login" className="btn-submit btn-login-link">
                    Quay lại đăng nhập <Icon icon={faArrowRight} />
                </Link>
            </div>
        )
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

                <button type="submit" className="btn-submit" disabled={isLoading}>
                    {isLoading ? 'Đang cập nhật...' : 'Đặt lại mật khẩu'} <Icon icon={faArrowRight} />
                </button>
            </form>
        </div>
    )
}
