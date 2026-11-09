import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import './ReasonReturn.scss'

export default function ReasonReturn() {
    return (
        <div className="reason-box">
            <h2>Lý do trả hàng / hoàn tiền</h2>
            <p className="subtitle">Thông tin rõ ràng giúp Saponi kiểm tra và hỗ trợ đúng vấn đề.</p>
            <hr />

            <div className="field">
                <label htmlFor="reason-select">Lý do yêu cầu *</label>
                <div className="select-wrap">
                    <select id="reason-select" defaultValue="damaged">
                        <option value="damaged">Sản phẩm bị hư hỏng khi nhận hàng</option>
                        <option value="wrong">Giao sai sản phẩm</option>
                        <option value="expired">Sản phẩm hết hạn / có dấu hiệu bất thường</option>
                        <option value="missing">Thiếu sản phẩm trong kiện hàng</option>
                        <option value="other">Lý do khác</option>
                    </select>
                    <FontAwesomeIcon icon={faChevronDown} className="arrow" />
                </div>
            </div>

            <div className="field">
                <label htmlFor="reason-desc">Mô tả chi tiết *</label>
                <textarea id="reason-desc" />
            </div>

            <div className="field">
                <label>Đính kèm ảnh minh chứng</label>
                <label className="upload-box" htmlFor="upload-img">
                    <input id="upload-img" type="file" accept="image/*" multiple hidden />
                    <strong>Chọn ảnh hoặc kéo thả vào đây</strong>
                    <span>Ảnh sản phẩm, bao bì và nhãn vận chuyển rõ nét</span>
                </label>
                <p className="hint">Chưa có ảnh đính kèm. Vui lòng tránh để lộ thông tin nhạy cảm.</p>
            </div>
        </div>
    )
}