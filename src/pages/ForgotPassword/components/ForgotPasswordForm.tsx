import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight'
import Icon from '../../../components/Icon'
import './ForgotPasswordForm.css'

export default function ForgotPasswordForm() {
    const [email, setEmail] = useState('')
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isResent, setIsResent] = useState(false)

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (!email.trim()) return

        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
            setIsSubmitted(true)
        }, 500)
    }

    function handleResend() {
        setIsResent(true)
        setTimeout(() => {
            setIsResent(false)
        }, 3000)
    }

    if (isSubmitted) {
        return (
            <div className="forgot-box">
                <Link to="/login" className="forgot-back-link">
                    <Icon icon={faArrowLeft} /> Quay lại đăng nhập
                </Link>

                <h2 className="auth-title">Kiểm tra email của bạn</h2>
                <p className="check-email-desc">
                    Saponi đã gửi liên kết đặt lại mật khẩu đến địa chỉ email của bạn:
                </p>

                <div className="sent-email-box">
                    {email}
                </div>

                <p className="check-email-instruction">
                    Mở email và nhấn vào liên kết để tạo mật khẩu mới. Liên kết có hiệu lực trong 10 phút.
                </p>

                <div className="check-email-card">
                    <h3 className="check-email-card-title">Bạn chưa nhận được email?</h3>
                    <p className="check-email-card-desc">
                        Hãy kiểm tra thư mục Spam hoặc Thư rác, hoặc gửi lại liên kết bên dưới.
                    </p>
                </div>

                {isResent && (
                    <p className="resend-success-text">Đã gửi lại liên kết mới vào email của bạn!</p>
                )}

                <button type="button" className="btn-resend-outline" onClick={handleResend}>
                    Gửi lại liên kết
                </button>
            </div>
        )
    }

    return (
        <div className="forgot-box">
            <Link to="/login" className="forgot-back-link">
                <Icon icon={faArrowLeft} /> Quay lại đăng nhập
            </Link>

            <h2 className="auth-title">Quên mật khẩu?</h2>
            <p className="forgot-desc">
                Đừng lo, hãy nhập email đã đăng ký. Saponi sẽ gửi cho bạn liên kết để đặt lại mật khẩu.
            </p>

            <form className="forgot-form" onSubmit={handleSubmit}>
                <div className="form-item">
                    <label>Địa chỉ email</label>
                    <input
                        type="email"
                        placeholder="Nhập địa chỉ email của bạn"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="btn-submit" disabled={isLoading}>
                    {isLoading ? 'Đang gửi...' : 'Gửi liên kết đặt lại mật khẩu'} <Icon icon={faArrowRight} />
                </button>

                <p className="forgot-note">
                    Bạn sẽ nhận được email hướng dẫn trong ít phút.
                </p>
            </form>
        </div>
    )
}
