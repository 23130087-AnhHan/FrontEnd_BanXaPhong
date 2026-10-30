import './LoginForm.css'

export default function LoginForm() {
    return (
        <div className="login-box">
            <a href="/" className="back-link"> Về trang chủ</a>

            <h2 className="login-title">Chào mừng bạn trở lại</h2>
            <p className="login-desc">
                Đăng nhập để theo dõi đơn hàng và lưu lại những sản phẩm dịu lành bạn yêu thích.
            </p>

            <div className="login-tabs">
                <button type="button" className="tab-btn active">Đăng nhập</button>
                <a href="/register" className="tab-btn">Đăng ký</a>
            </div>

            <form className="login-form">
                <div className="form-item">
                    <label>Địa chỉ email</label>
                    <input type="email" placeholder="Nhập địa chỉ email của bạn" />
                </div>

                <div className="form-item">
                    <label>Mật khẩu</label>
                    <div className="password-box">
                        <input type="password" placeholder="Nhập mật khẩu" />
                        <button type="button" className="btn-eye"></button>
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
                Bạn chưa có tài khoản? <a href="/register">Đăng ký ngay</a>
            </p>
        </div>
    )
}
