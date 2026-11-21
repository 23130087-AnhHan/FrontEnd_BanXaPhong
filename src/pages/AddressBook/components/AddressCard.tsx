import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck'
import { faPen } from '@fortawesome/free-solid-svg-icons/faPen'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons/faTrashCan'
import Icon from '../../../components/Icon'
import { Link } from 'react-router-dom'
import { formatAddress } from '../../../api/accountApi'
import type { Address } from '../../../api/accountApi'
import './AddressCard.css'

interface AddressCardProps {
  address: Address
  busy: boolean
  onDelete: () => void
  onSetDefault: () => void
}

export default function AddressCard({ address, busy, onDelete, onSetDefault }: AddressCardProps) {
  return (
    <article className="address-card" aria-label={'Địa chỉ của ' + address.receiverName}>
      <div className="address-card-header">
        <div>
          <h2>{address.receiverName}</h2>
          <p>{address.receiverPhone}</p>
        </div>
        {address.isDefault && (
          <span className="address-default"><Icon icon={faCheck} />Mặc định</span>
        )}
      </div>

      <p className="address-card-text">{formatAddress(address)}</p>

      <div className="address-card-actions">
        {!busy && <Link to={'/tai-khoan/dia-chi/' + encodeURIComponent(address.id) + '/chinh-sua'} className="address-edit">
          <Icon icon={faPen} />
          Chỉnh sửa
        </Link>}
        <button type="button" disabled={busy} onClick={onDelete}>
          <Icon icon={faTrashCan} />
          Xóa
        </button>
        {!address.isDefault && <button type="button" disabled={busy} onClick={onSetDefault}>Đặt mặc định</button>}
      </div>
    </article>
  )
}
