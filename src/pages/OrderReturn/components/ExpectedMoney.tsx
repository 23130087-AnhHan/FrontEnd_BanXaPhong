import './ExpectedMoney.css'

export default function ExpectedMoney() {
    return (
        <div className="expected-card">
            <div className="expected-header">
                <h3>Số tiền dự kiến</h3>
            </div>

            <div className="expected-subtotal">
                <span>Tạm tính:</span>
                <strong>375.000 đ</strong>
            </div>

            <div className="expected-note">
                <h5>Ước tính trước điều chỉnh</h5>
                <p>
                    Chưa điều chỉnh ưu đãi và phí vận chuyển. Số tiền hoàn cuối cùng sẽ được
                    Saponi xác nhận sau khi kiểm tra yêu cầu.
                </p>
            </div>

            <div className="expected-origin">
                <h5>Thanh toán của đơn gốc</h5>

                <div className="origin-row">
                    <span>Giá trị 4 sản phẩm</span>
                    <span>705.000 đ</span>
                </div>

                <div className="origin-row">
                    <span>Phí vận chuyển</span>
                    <span>25.000 đ</span>
                </div>

                <div className="origin-row discount">
                    <span>Giảm giá voucher</span>
                    <span>-30.000 đ</span>
                </div>

                <div className="origin-row">
                    <span>Đã thanh toán</span>
                    <strong>700.000 đ</strong>
                </div>
            </div>
        </div>
    )
}

