import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import './InforOrder.css'

export default function InforOrder() {
    return (
        <div className="order-info-card">
            <h3>Thông tin đơn hàng</h3>

            <div className="order-id-row">
                <span className="order-id">#SPN-84920</span>
                <span className="order-badge">
                    <FontAwesomeIcon icon={faCheck} /> Đã giao
                </span>
            </div>

            <p className="order-date">Đặt lúc 14:30, 28/10/2024</p>

            <hr className="order-divider" />

            <p className="order-customer">Hàn Tạ · 0983 234 567</p>
            <p className="order-payment">Thanh toán khi nhận hàng (COD)</p>
        </div>
    )
}

