import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { formatAddress, getAddresses, getProfile, saveProfile } from '../../../api/accountApi'
import type { Profile } from '../../../api/accountApi'
import { layNguoiDungHienTai, luuNguoiDungHienTai } from '../../../api/authApi'
import './ProfileForm.css'

const emptyProfile: Profile = { hoTen: '', email: '', phone: '', birthday: '' }

export default function ProfileForm() {
  const [profile, setProfile] = useState(emptyProfile)
  const [original, setOriginal] = useState(emptyProfile)
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [reload, setReload] = useState(0)

  useEffect(() => {
    let active = true
    setLoading(true)
    setError('')
    Promise.all([getProfile(), getAddresses()]).then(([user, addresses]) => {
      if (!active) return
      const data = { hoTen: user.hoTen, email: user.email, phone: user.phone ?? '', birthday: user.birthday ?? '' }
      setProfile(data)
      setOriginal(data)
      const defaultAddress = addresses.find((item) => item.isDefault)
      setAddress(defaultAddress ? formatAddress(defaultAddress) : '')
      luuNguoiDungHienTai(user)
    }).catch(() => {
      if (active) setError('Không tải được thông tin cá nhân. Vui lòng thử lại.')
    }).finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [reload])

  async function handleSave(event: FormEvent) {
    event.preventDefault()
    if (loading || saving) return
    setError('')
    setMessage('')
    const data = { ...profile, hoTen: profile.hoTen.trim(), email: profile.email.trim(), phone: profile.phone?.replace(/\s/g, '') }
    if (!data.hoTen || (data.phone && !/^(0\d{9}|\+84\d{9})$/.test(data.phone))) {
      setError('Vui lòng nhập họ tên và số điện thoại hợp lệ.')
      return
    }
    setSaving(true)
    try {
      const user = await saveProfile(data)
      if (layNguoiDungHienTai()?.id !== user.id) return
      setProfile(data)
      setOriginal(data)
      luuNguoiDungHienTai(user)
      setMessage('Đã lưu thông tin cá nhân.')
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Không lưu được thông tin.')
    } finally { setSaving(false) }
  }

  return (
    <form className="account-form" aria-labelledby="profile-title" onSubmit={handleSave} onReset={() => { setProfile(original); setError(''); setMessage('') }}>
      <div className="account-form-heading">
        <h1 id="profile-title">Thông tin cá nhân</h1>
        <p>Cập nhật thông tin liên hệ, số điện thoại và địa chỉ email để nhận thông báo đơn hàng và ưu đãi từ Saponi.</p>
      </div>

      {loading && <p className="account-message" role="status">Đang tải thông tin...</p>}
      {error && <p className="account-message account-error" role="alert">{error} {!original.email && <button type="button" onClick={() => setReload(reload + 1)}>Thử lại</button>}</p>}
      {message && <p className="account-message" role="status">{message}</p>}

      <fieldset className="account-form-fields" disabled={loading || saving || !original.email}>
        <div className="account-field">
          <label htmlFor="profile-name">Họ và tên</label>
          <input id="profile-name" type="text" autoComplete="name" required maxLength={100} value={profile.hoTen} onChange={(event) => setProfile({ ...profile, hoTen: event.target.value })} />
        </div>

        <div className="profile-form-row">
          <div className="account-field">
            <label htmlFor="profile-phone">Số điện thoại</label>
            <input id="profile-phone" type="tel" autoComplete="tel" value={profile.phone} onChange={(event) => setProfile({ ...profile, phone: event.target.value })} />
          </div>
          <div className="account-field">
            <label htmlFor="profile-birthday">Ngày sinh</label>
            <input id="profile-birthday" type="date" autoComplete="bday" max={new Date().toISOString().slice(0, 10)} value={profile.birthday} onChange={(event) => setProfile({ ...profile, birthday: event.target.value })} />
          </div>
        </div>

        <div className="account-field">
          <label htmlFor="profile-email">Địa chỉ email</label>
          <input id="profile-email" type="email" autoComplete="email" required maxLength={254} value={profile.email} onChange={(event) => setProfile({ ...profile, email: event.target.value })} />
        </div>

        <div className="account-field">
          <label htmlFor="profile-address">Địa chỉ giao hàng mặc định</label>
          <input
            id="profile-address"
            type="text"
            autoComplete="street-address"
            value={address}
            placeholder="Chưa có địa chỉ mặc định"
            readOnly
          />
          <Link to="/tai-khoan/dia-chi">Chỉnh sửa trong sổ địa chỉ</Link>
        </div>
      </fieldset>

      <div className="account-form-buttons profile-form-actions">
        <button type="reset" disabled={loading || saving || !original.email}>Huỷ bỏ</button>
        <button type="submit" className="account-button-primary" disabled={loading || saving || !original.email}>{saving ? 'Đang lưu...' : 'Lưu thay đổi'}</button>
      </div>
    </form>
  )
}
