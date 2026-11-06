import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import Icon from '../../../components/Icon'
import './ContactForm.css'

export default function ContactForm() {
  function handleSubmit(event) {
    event.preventDefault()
  }

  return (
    <section className="contact-form-box" aria-labelledby="contact-form-title">
      <h2 id="contact-form-title">Đồng hành cùng sự an lành của bạn</h2>
      <p className="contact-form-description">
        Dù bạn cần gợi ý xà phòng hợp với làn da nhạy cảm hay muốn đặt bộ quà tặng tinh tế cho doanh nghiệp, người thân hoặc bạn bè,
        Saponi sẽ chăm chút từng chi tiết nhỏ nhất.
      </p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="contact-field">
          <div className="contact-field-heading">
            <label htmlFor="contact-name">Họ và tên của bạn <span aria-hidden="true">*</span></label>
            <span>Ví dụ: Minh Tâm</span>
          </div>
          <input id="contact-name" name="fullName" type="text" autoComplete="name" placeholder="Nhập họ và tên đầy đủ" required />
        </div>

        <div className="contact-form-row">
          <div className="contact-field">
            <label htmlFor="contact-phone">Số điện thoại <span aria-hidden="true">*</span></label>
            <input id="contact-phone" name="phone" type="tel" autoComplete="tel" placeholder="09xx xxx xxx" required />
          </div>
          <div className="contact-field">
            <label htmlFor="contact-email">Địa chỉ Email <span aria-hidden="true">*</span></label>
            <input id="contact-email" name="email" type="email" autoComplete="email" placeholder="example@gmail.com" required />
          </div>
        </div>

        <div className="contact-field">
          <label htmlFor="contact-topic">Chủ đề liên hệ bạn quan tâm <span aria-hidden="true">*</span></label>
          <select id="contact-topic" name="topic" defaultValue="product-advice" required>
            <option value="product-advice">Tư vấn chọn xà phòng thảo dược phù hợp với làn da</option>
            <option value="order-support">Hỗ trợ đơn hàng và giao nhận</option>
            <option value="wholesale">Hợp tác bán sỉ và đối tác</option>
            <option value="corporate-gifts">Quà tặng doanh nghiệp</option>
            <option value="family-gifts">Quà tặng người thân</option>
            <option value="friend-gifts">Quà tặng bạn bè</option>
            <option value="feedback">Góp ý và nội dung khác</option>
            <option value="other">Khác</option>
          </select>
        </div>

        <div className="contact-field">
          <div className="contact-field-heading">
            <label htmlFor="contact-message">Lời nhắn & Chi tiết yêu cầu <span aria-hidden="true">*</span></label>
            <span>Ghi chú loại da, số lượng dự kiến...</span>
          </div>
          <textarea
            id="contact-message"
            name="message"
            rows={6}
            placeholder="Chia sẻ với Saponi về tình trạng da của bạn, số lượng quà tặng dự kiến hoặc bất kỳ câu hỏi nào bạn đang quan tâm..."
            required
          />
        </div>

        <button type="submit" className="contact-submit">
          Gửi tin nhắn cho Saponi
          <Icon icon={faPaperPlane} />
        </button>
      </form>
    </section>
  )
}
