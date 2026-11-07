import './AuthLeftPanel.css'
import authLeftImg from '../assets/auth-left.png'

export default function AuthLeftPanel() {
    return (
        <div className="auth-panel">
            <div className="auth-panel-image-wrapper">
                <img
                    src={authLeftImg}
                    alt="Xà phòng Saponi"
                    className="auth-panel-img"
                />
            </div>
            <div className="auth-panel-content">
                <span className="auth-panel-tagline">Dịu lành từ thiên nhiên</span>
                <h2 className="auth-panel-title">
                    Một chút dịu lành,<br />
                    cho mỗi ngày của bạn.
                </h2>
                <p className="auth-panel-desc">
                    Mỗi bánh xà phòng là một tác phẩm nghệ thuật được chế tác thủ
                    công, kết hợp tinh túy từ thảo mộc Việt Nam và dầu ô liu nguyên
                    chất.
                </p>
                <div className="auth-panel-divider"></div>
                <div className="auth-panel-footer">
                    <span>Không chất bảo quản</span>
                    <span className="dot">·</span>
                    <span>Chế tác thủ công</span>
                </div>
            </div>
        </div>
    )
}
