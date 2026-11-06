import contactImage from '../../../assets/contact.png'
import './WorkshopCard.css'

export default function WorkshopCard() {
  return (
    <section className="contact-workshop" aria-labelledby="contact-workshop-title">
      <div className="contact-workshop-image">
        <img src={contactImage} alt="Xưởng Saponi với xà phòng thủ công, thảo mộc và tinh dầu tự nhiên" />
        <div className="contact-workshop-heading">
          <span>TRẢI NGHIỆM TRỰC TIẾP</span>
          <h2 id="contact-workshop-title">Ghé thăm xưởng chế tác Saponi</h2>
        </div>
      </div>
      <p>
        Tận mắt xem quy trình <strong>chế tác thủ công</strong> xà phòng,
        chạm vào những bánh xà phòng thảo mộc mộc mạc và thử hương tinh dầu nguyên chất
        ngay tại xưởng Saponi.
      </p>
    </section>
  )
}
