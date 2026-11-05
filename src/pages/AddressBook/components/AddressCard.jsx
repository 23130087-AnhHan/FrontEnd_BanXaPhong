import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck'
import { faPen } from '@fortawesome/free-solid-svg-icons/faPen'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons/faTrashCan'
import Icon from '../../../components/Icon'
import './AddressCard.css'

export default function AddressCard({ address }) {
  return (
    <article className="address-card" aria-label={'Địa chỉ của ' + address.name}>
      <div className="address-card-header">
        <div>
          <h2>{address.name}</h2>
          <p>{address.phone}</p>
        </div>
        {address.isDefault && (
          <span className="address-default"><Icon icon={faCheck} />Mặc định</span>
        )}
      </div>

      <p className="address-card-text">{address.address}</p>

      <div className="address-card-actions">
        <button type="button" className="address-edit">
          <Icon icon={faPen} />
          Chỉnh sửa
        </button>
        <button type="button">
          <Icon icon={faTrashCan} />
          Xóa
        </button>
      </div>
    </article>
  )
}
