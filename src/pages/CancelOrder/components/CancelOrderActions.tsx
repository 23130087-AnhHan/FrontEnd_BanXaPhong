import { Link } from 'react-router-dom'
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import Icon from '../../../components/Icon'
import './CancelOrderActions.css'

export default function CancelOrderActions() {
  return (
    <div className="cancel-order-actions">
      <div className="cancel-order-warning">
        <Icon icon={faCircleExclamation} />
        <div>
          <strong>Bạn sẽ không thể khôi phục đơn hàng sau khi huỷ</strong>
          <p>
            Nếu đổi ý, bạn cần đặt đơn mới. Giá bán và ưu đãi sẽ được áp dụng tại thời điểm đặt lại.
          </p>
        </div>
      </div>
      <div className="cancel-order-buttons">
        <Link to="/tai-khoan/don-hang">Quay lại, giữ đơn hàng</Link>
        <button
          type="submit"
          form="cancel-order-form"
        >
          Xác nhận huỷ đơn
        </button>
      </div>
    </div>
  )
}
