import { faClock } from '@fortawesome/free-regular-svg-icons'
import Icon from '../../components/Icon'
import './ContactPage.css'

export default function ContactPage() {
  return (
    <div className="contact-page">
      <div className="contact-container">
        <div className="contact-heading">
          <div>
            <h1>Liên hệ với Saponi</h1>
            <p>
              Chúng tôi luôn sẵn lòng lắng nghe và chia sẻ câu chuyện về xà phòng thiên nhiên cùng bạn.
              Mỗi lời nhắn đều được hồi đáp trân trọng từ xưởng thủ công.
            </p>
          </div>
          <div className="contact-response-time">
            <Icon icon={faClock} />
            <div>
              <span>Thời gian phản hồi</span>
              <strong>Thường trong vòng 2 - 4 giờ làm việc</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
