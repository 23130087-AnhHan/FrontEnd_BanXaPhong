import { faLeaf, faPhone } from '@fortawesome/free-solid-svg-icons'
import Icon from '../../../components/Icon'
import './ContactCommitment.css'

export default function ContactCommitment() {
  return (
    <section className="contact-commitment" aria-labelledby="contact-commitment-title">
      <span className="contact-commitment-icon"><Icon icon={faLeaf} /></span>
      <div>
        <h2 id="contact-commitment-title">Cam kết nguyên liệu bền vững</h2>
        <p>Dầu dừa Bến Tre, cám gạo tươi, mướp đắng và thảo dược canh tác tự nhiên thuần khiết 100%.</p>
      </div>
      <a href="tel:0908123456"><Icon icon={faPhone} /> Gọi 0908 123 456</a>
    </section>
  )
}
