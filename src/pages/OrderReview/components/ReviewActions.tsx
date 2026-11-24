import { Link } from 'react-router-dom'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import Icon from '../../../components/Icon'
import './ReviewActions.css'

export default function ReviewActions() {
  return (
    <div className="review-actions-buttons">
      <Link to="/tai-khoan/don-hang">Quay lại đơn hàng</Link>
      <button type="submit">Gửi đánh giá<Icon icon={faPaperPlane} /></button>
    </div>
  )
}
