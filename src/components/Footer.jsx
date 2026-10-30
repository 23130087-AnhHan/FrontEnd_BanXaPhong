import './Footer.css'
import saponiLogo from '../assets/saponi-logo.png'

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-body">

                <div className="footer-brand">
                    <div className="footer-logo">
                        <img src={saponiLogo} alt="Saponi logo" className="footer-logo-img" />
                    </div>
                    <p className="footer-desc">
                        Xà phòng thảo mộc thủ công từ nguyên liệu tự nhiên,
                        mang lại sự bình yên và nuôi dưỡng làn da thuần khiết nhất cùng Saponi.
                    </p>
                </div>

                <div className="footer-col">
                    <h4 className="footer-col-title">Khám phá</h4>
                    <ul className="footer-links">
                        <li><a href="#">Sản phẩm mới</a></li>
                        <li><a href="#">Xà phòng hữu cơ</a></li>
                        <li><a href="#">Tinh dầu thiên nhiên</a></li>
                        <li><a href="#">Bộ quà tặng</a></li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h4 className="footer-col-title">Hỗ trợ</h4>
                    <ul className="footer-links">
                        <li><a href="#">Giỏ hàng & Thanh toán</a></li>
                        <li><a href="#">Hướng dẫn mua hàng</a></li>
                        <li><a href="#">Liên hệ</a></li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h4 className="footer-col-title">Đăng ký nhận ưu đãi</h4>
                    <p className="footer-desc">
                        Xà phòng thảo mộc thủ công từ nguyên liệu tự nhiên,
                        mang lại sự bình yên và nuôi dưỡng làn da thuần khiết nhất cùng Saponi.
                    </p>
                    <div className="footer-subscribe">
                        <input type="email" placeholder="Email của bạn" className="footer-input" />
                        <button className="footer-btn-subscribe">Đăng ký</button>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>© 2024 Saponi. Tất cả quyền được bảo lưu.</p>
            </div>
        </footer>
    )
}

