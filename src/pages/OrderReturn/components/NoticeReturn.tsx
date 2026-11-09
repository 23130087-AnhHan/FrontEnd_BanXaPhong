import { Link } from 'react-router-dom'
import './NoticeReturn.scss'

export default function NoticeReturn() {
  return (
    <>
      <div className="notice-box">
        <div className="notice-header">

          <span>Lưu ý trước khi gửi yêu cầu</span>
        </div>

        <div className="notice-list">
          <p>Yêu cầu cần được kiểm tra theo điều kiện trả hàng / hoàn tiền áp dụng cho đơn của bạn.</p>
          <p>Vui lòng giữ sản phẩm, bao bì và minh chứng liên quan để đối chiếu khi Saponi liên hệ.</p>
          <p>Liên hệ Saponi để xác nhận điều kiện, chi phí và cách gửi trả trước khi chuyển hàng.</p>
        </div>
      </div>

      <div className="notice-help">

        <span>Cần trợ giúp? <Link to="/contact">Liên hệ Saponi</Link></span>
      </div>
    </>
  )
}
