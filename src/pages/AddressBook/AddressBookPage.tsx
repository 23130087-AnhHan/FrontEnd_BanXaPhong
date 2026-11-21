import { useEffect, useState } from 'react'
import { deleteAddress, getAddresses, setDefaultAddress } from '../../api/accountApi'
import type { Address } from '../../api/accountApi'
import { Link } from 'react-router-dom'
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus'
import AccountSidebar from '../../components/AccountSidebar'
import Icon from '../../components/Icon'
import AddressCard from './components/AddressCard'
import '../../styles/AccountPage.css'
import './AddressBookPage.css'


export default function AddressBookPage() {
  const [addresses, setAddresses] = useState<Address[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [reload, setReload] = useState(0)

  useEffect(() => {
    let active = true
    getAddresses().then((data) => { if (active) setAddresses(data) })
      .catch(() => { if (active) setError('Không tải được sổ địa chỉ. Vui lòng thử lại.') })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [reload])

  async function updateAddress(id: string, remove = false) {
    if (saving || loading) return
    if (remove && !window.confirm('Bạn muốn xóa địa chỉ này?')) return
    setSaving(true)
    setError('')
    setMessage('')
    try {
      if (remove) await deleteAddress(id)
      else await setDefaultAddress(id)
      setAddresses(await getAddresses())
      setMessage(remove ? 'Đã xóa địa chỉ.' : 'Đã đặt địa chỉ mặc định.')
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Không cập nhật được địa chỉ.')
      try { setAddresses(await getAddresses()) } catch {}
    } finally { setSaving(false) }
  }

  return (
    <div className="account-page">
      <nav className="account-breadcrumb" aria-label="Đường dẫn">
        <Link to="/">Trang chủ</Link>
        <span aria-hidden="true">/</span>
        <Link to="/tai-khoan">Tài khoản</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Sổ địa chỉ</span>
      </nav>

      <div className="account-layout">
        <AccountSidebar activePage="addresses" />
        <section className="account-form" aria-labelledby="address-book-title">
          <div className="address-book-header">
            <div className="account-form-heading">
              <h1 id="address-book-title">Sổ địa chỉ</h1>
              <p>Bạn đã lưu {addresses.length} địa chỉ giao hàng. Địa chỉ mặc định sẽ được sử dụng cho đơn hàng tiếp theo.</p>
            </div>
            <div className="address-add">
              <Link to="/tai-khoan/dia-chi/them-moi" className="address-add-button">
                <Icon icon={faPlus} />
                Thêm địa chỉ mới
              </Link>
            </div>
          </div>

          {loading && <p className="account-message" role="status">Đang tải sổ địa chỉ...</p>}
          {error && <p className="account-message account-error" role="alert">{error} <button type="button" disabled={saving || loading} onClick={() => { setLoading(true); setError(''); setReload(reload + 1) }}>Thử lại</button></p>}
          {message && <p className="account-message" role="status">{message}</p>}
          {!loading && !error && addresses.length === 0 && <p className="account-message">Bạn chưa có địa chỉ giao hàng.</p>}
          <div className="address-book-list">
            {addresses.map((address) => <AddressCard key={address.id} address={address} busy={loading || saving} onDelete={() => updateAddress(address.id, true)} onSetDefault={() => updateAddress(address.id)} />)}
          </div>
        </section>
      </div>
    </div>
  )
}
