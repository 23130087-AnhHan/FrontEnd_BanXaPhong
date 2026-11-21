import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getAddress, saveAddress } from '../../../api/accountApi'
import type { AddressInput } from '../../../api/accountApi'
import './AddAddressForm.css'

export default function AddAddressForm() {
  const { addressId } = useParams()
  const navigate = useNavigate()
  const [address, setAddress] = useState<AddressInput>({ receiverName: '', receiverPhone: '', province: '', district: '', ward: '', detailAddress: '', isDefault: false })
  const [loading, setLoading] = useState(Boolean(addressId))
  const [loaded, setLoaded] = useState(!addressId)
  const [saving, setSaving] = useState(false)
  const [wasDefault, setWasDefault] = useState(false)
  const [error, setError] = useState('')
  const [reload, setReload] = useState(0)

  useEffect(() => {
    if (!addressId) return
    let active = true
    setLoading(true)
    setError('')
    getAddress(addressId).then((data) => {
      if (!active) return
      const { receiverName, receiverPhone, province, district, ward, detailAddress, isDefault } = data
      setAddress({ receiverName, receiverPhone, province, district, ward, detailAddress, isDefault })
      setWasDefault(isDefault)
      setLoaded(true)
    }).catch((error) => { if (active) setError(error instanceof Error ? error.message : 'Không tải được địa chỉ.') })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [addressId, reload])

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (loading || saving || !loaded) return
    setError('')
    const data = { ...address, receiverName: address.receiverName.trim(), receiverPhone: address.receiverPhone.replace(/\s/g, ''), province: address.province.trim(), district: address.district.trim(), ward: address.ward.trim(), detailAddress: address.detailAddress.trim() }
    if (!data.receiverName || !data.province || !data.ward || !data.detailAddress || !/^(0\d{9}|\+84\d{9})$/.test(data.receiverPhone)) {
      setError('Vui lòng nhập đầy đủ địa chỉ và số điện thoại hợp lệ.')
      return
    }
    setSaving(true)
    try {
      await saveAddress(data, addressId)
      navigate('/tai-khoan/dia-chi', { replace: true })
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Không lưu được địa chỉ.')
    } finally { setSaving(false) }
  }

  return (
    <form className="account-form" aria-labelledby="add-address-title" onSubmit={handleSubmit}>
      <div className="account-form-heading">
        <h1 id="add-address-title">{addressId ? 'Chỉnh sửa địa chỉ' : 'Thêm địa chỉ mới'}</h1>
        <p>
          Quản lý thông tin người nhận và địa chỉ giao hàng của bạn.
          Địa chỉ mặc định sẽ được sử dụng cho đơn hàng tiếp theo.
        </p>
      </div>

      {loading && <p className="account-message" role="status">Đang tải địa chỉ...</p>}
      {error && <p className="account-message account-error" role="alert">{error} {!loaded && <button type="button" onClick={() => setReload(reload + 1)}>Thử lại</button>}</p>}
      <fieldset className="account-form-fields" disabled={loading || saving || !loaded}>
        <div className="account-field">
          <label htmlFor="add-address-name">Người nhận</label>
          <input id="add-address-name" type="text" autoComplete="name" required maxLength={100} placeholder="Nhập họ và tên người nhận" value={address.receiverName} onChange={(event) => setAddress({ ...address, receiverName: event.target.value })} />
        </div>

        <div className="account-field">
          <label htmlFor="add-address-phone">Số điện thoại</label>
          <input id="add-address-phone" type="tel" autoComplete="tel" required placeholder="Nhập số điện thoại liên hệ" value={address.receiverPhone} onChange={(event) => setAddress({ ...address, receiverPhone: event.target.value })} />
        </div>

        <div className="add-address-row">
          <div className="account-field">
            <label htmlFor="add-address-city">Tỉnh / thành phố</label>
            <input id="add-address-city" type="text" autoComplete="address-level1" required maxLength={100} placeholder="Nhập tỉnh / thành phố" value={address.province} onChange={(event) => setAddress({ ...address, province: event.target.value })} />
          </div>
          <div className="account-field">
            <label htmlFor="add-address-district">Quận / huyện</label>
            <input id="add-address-district" type="text" autoComplete="address-level2" maxLength={100} placeholder="Nhập quận / huyện" value={address.district} onChange={(event) => setAddress({ ...address, district: event.target.value })} />
          </div>
        </div>

        <div className="account-field">
          <label htmlFor="add-address-ward">Phường / xã</label>
          <input id="add-address-ward" type="text" autoComplete="address-level3" required maxLength={100} placeholder="Nhập phường / xã" value={address.ward} onChange={(event) => setAddress({ ...address, ward: event.target.value })} />
        </div>

        <div className="account-field">
          <label htmlFor="add-address-detail">Địa chỉ chi tiết</label>
          <input
            id="add-address-detail"
            type="text"
            autoComplete="street-address"
            required
            maxLength={255}
            value={address.detailAddress}
            onChange={(event) => setAddress({ ...address, detailAddress: event.target.value })}
            placeholder="Số nhà, tên đường, khu vực, toà nhà..."
          />
        </div>

        <label className="add-address-default">
          <input type="checkbox" role="switch" checked={address.isDefault} disabled={wasDefault} onChange={(event) => setAddress({ ...address, isDefault: event.target.checked })} />
          <span>Đặt làm địa chỉ mặc định</span>
        </label>
      </fieldset>

      <div className="account-form-buttons add-address-actions">
        <Link to="/tai-khoan/dia-chi">Quay lại</Link>
        <button type="submit" className="account-button-primary" disabled={loading || saving || !loaded}>{saving ? 'Đang lưu...' : 'Lưu địa chỉ'}</button>
      </div>
    </form>
  )
}
