import { faArrowUpRightFromSquare, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import Icon from '../../../components/Icon'
import './ContactMap.css'

const workshopAddress = '124 Thảo Điền, Thủ Đức, Thành phố Hồ Chí Minh'
const directionsLink = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(workshopAddress)

export default function ContactMap() {
  return (
    <section className="contact-map" aria-label="Vị trí xưởng Saponi">
      <div className="contact-map-preview">
        <iframe
          title="Bản đồ xưởng Saponi tại 124 Thảo Điền, Thủ Đức"
          src={'https://maps.google.com/maps?q=' + encodeURIComponent(workshopAddress) + '&z=15&output=embed'}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <span className="contact-map-label"><Icon icon={faLocationDot} /> Xưởng thảo mộc Thảo Điền</span>
      </div>
      <div className="contact-map-details">
        <span className="contact-map-icon"><Icon icon={faLocationDot} /></span>
        <div>
          <h2>124 Thảo Điền, P. Thảo Điền</h2>
          <p>TP. Thủ Đức, TP. Hồ Chí Minh</p>
        </div>
        <a href={directionsLink} target="_blank" rel="noreferrer">
          Chỉ đường <Icon icon={faArrowUpRightFromSquare} />
        </a>
      </div>
    </section>
  )
}
