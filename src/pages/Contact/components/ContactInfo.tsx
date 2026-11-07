import { faEnvelope, faLocationDot, faPhone, faStore } from '@fortawesome/free-solid-svg-icons'
import Icon from '../../../components/Icon'
import './ContactInfo.css'

export default function ContactInfo() {
  return (
    <section className="contact-info" aria-labelledby="contact-info-title">
      <h2 id="contact-info-title">Thông tin kết nối</h2>
      <div className="contact-info-list">
        <div className="contact-info-item">
          <span className="contact-info-icon"><Icon icon={faLocationDot} /></span>
          <div>
            <h3>ĐỊA CHỈ XƯỞNG & CỬA HÀNG</h3>
            <address>124 Thảo Điền, Thành phố Thủ Đức, TP. Hồ Chí Minh</address>
          </div>
        </div>

        <div className="contact-info-item">
          <span className="contact-info-icon"><Icon icon={faPhone} /></span>
          <div>
            <h3>HOTLINE & ZALO TƯ VẤN</h3>
            <a href="tel:0908123456">0908 123 456</a>
            <p>08:30 - 21:00 hằng ngày</p>
          </div>
        </div>

        <div className="contact-info-item">
          <span className="contact-info-icon"><Icon icon={faEnvelope} /></span>
          <div>
            <h3>HÒM THƯ ĐIỆN TỬ</h3>
            <a href="mailto:hello@saponi.vn">hello@saponi.vn</a>
            {' / '}
            <a href="mailto:cskh@saponi.vn">cskh@saponi.vn</a>
            <p>Phản hồi đơn hàng, yêu cầu sỉ và đối tác</p>
          </div>
        </div>

        <div className="contact-info-item">
          <span className="contact-info-icon"><Icon icon={faStore} /></span>
          <div>
            <h3>GIỜ MỞ CỬA XƯỞNG</h3>
            <span>Thứ 2 - Chủ Nhật: 08:30 - 20:30</span>
            <p>Mở cửa cả các ngày lễ</p>
          </div>
        </div>
      </div>
    </section>
  )
}
