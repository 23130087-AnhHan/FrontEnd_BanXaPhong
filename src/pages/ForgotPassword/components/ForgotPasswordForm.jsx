import { useState } from 'react'
import { Link } from 'react-router-dom'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight'
import Icon from '../../../components/Icon'
import './ForgotPasswordForm.css'

export default function ForgotPasswordForm() {
    const [email, setEmail] = useState('')
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    function handleSubmit(e) {
        e.preventDefault()
        if (!email.trim()) return

        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
            setIsSubmitted(true)
        }, 500)
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

            {isSubmitted ? (
                <div className="forgot-success-card">
                    <h3 className="forgot-success-title">Đã gửi liên kết thành công!</h3>
                    <p className="forgot-success-desc">
                        Chúng tôi đã gửi hướng dẫn đặt lại mật khẩu tới địa chỉ <strong>{email}</strong>. Vui lòng kiểm tra hộp thư đến (hoặc hòm thư rác/spam) của bạn.
                    </p>
                    <button type="button" className="btn-forgot-resend" onClick={() => setIsSubmitted(false)}>
                        Gửi lại hoặc nhập email khác
                    </button>
                </div>
            ) : (
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
            )}
        </div>
    )
}
