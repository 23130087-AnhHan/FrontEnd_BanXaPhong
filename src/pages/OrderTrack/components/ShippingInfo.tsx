
import './ShippingInfo.scss';

export default function ShippingInfo() {
    return (
        <div className="shipping-card">
            <h3>Thông tin giao nhận</h3>

            <div className="shipping-section">
                <span className="section-label">NGƯỜI NHẬN</span>
                <h4>Hàn Gà</h4>
                <p>Số điện thoại: 0983 234 567</p>
                <p>56 45 Đường Hoa Lan, Phường 2, Quận Phú Nhuận, TP. Hồ Chí Minh</p>
            </div>

            <div className="shipping-divider"></div>

            <div className="shipping-section">
                <span className="section-label">VẬN CHUYỂN & THANH TOÁN</span>
                <p className="shipping-method">
                    Giao Hàng Nhanh (GHN) - Hỏa tốc
                </p>
                <p>Thanh toán khi nhận hàng (COD)</p>

                <div className="total-price">
                    <span>Tổng thanh toán</span>
                    <strong>700.000 đ</strong>
                </div>
            </div>

            <div className="shipping-note">
                <span className="section-label">GHI CHÚ CHO ĐƠN HÀNG</span>
                <p>
                    "Giao giờ hành chính, gọi trước khi giao 15 phút.
                    Vui lòng bọc kỹ đồ dễ vỡ."
                </p>
            </div>
        </div>
    );
}