import { useState } from 'react'
import type { FormEvent } from 'react'
import { changePassword } from '../../../api/accountApi'
import { faEye } from '@fortawesome/free-solid-svg-icons/faEye'
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons/faEyeSlash'
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons/faCircleCheck'
import Icon from '../../../components/Icon'
import './ChangePasswordForm.css'

const securityTips = [
  'Sử dụng ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.',
  'Không dùng lại mật khẩu đã sử dụng gần đây hoặc trùng với mật khẩu của các tài khoản khác.',
  'Cập nhật mật khẩu định kỳ để tăng cường bảo mật cho tài khoản của bạn.',
]

export default function ChangePasswordForm() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  function resetForm() {
    setError('')
    setMessage('')
    setShowCurrentPassword(false)
    setShowNewPassword(false)
    setShowConfirmPassword(false)
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (saving) return
    const form = event.currentTarget
    const data = new FormData(form)
    const current = String(data.get('currentPassword'))
    const password = String(data.get('newPassword'))
    setError('')
    setMessage('')
    if (password.length < 8 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/\d/.test(password) || !/[^A-Za-z0-9\s]/.test(password)) {
      setError('Mật khẩu cần ít nhất 8 ký tự, có chữ hoa, chữ thường, số và ký tự đặc biệt.')
      return
    }
    if (password !== data.get('confirmPassword')) {
      setError('Mật khẩu xác nhận không khớp.')
      return
    }
    setSaving(true)
    try {
      await changePassword(current, password)
      form.reset()
      setMessage('Đã cập nhật mật khẩu.')
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Không cập nhật được mật khẩu.')
    } finally { setSaving(false) }
  }

  return (
    <form className="account-form" aria-labelledby="change-password-title" onSubmit={handleSubmit} onReset={resetForm}>
      <div className="account-form-heading">
        <h1 id="change-password-title">Đổi mật khẩu</h1>
        <p>Cập nhật mật khẩu mới để tăng cường bảo mật cho tài khoản của bạn.</p>
      </div>

      {error && <p className="account-message account-error" role="alert">{error}</p>}
      {message && <p className="account-message" role="status">{message}</p>}
      <fieldset className="account-form-fields" disabled={saving}>
        <div className="account-field">
          <label htmlFor="current-password">Mật khẩu hiện tại</label>
          <div className="change-password-input">
            <input
              id="current-password"
              name="currentPassword"
              required
              type={showCurrentPassword ? 'text' : 'password'}
              autoComplete="current-password"
              placeholder="Nhập mật khẩu hiện tại"
            />
            <button
              className="password-toggle"
              type="button"
              aria-label={showCurrentPassword ? 'Ẩn mật khẩu hiện tại' : 'Hiện mật khẩu hiện tại'}
              aria-controls="current-password"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            >
              <Icon icon={showCurrentPassword ? faEye : faEyeSlash} />
            </button>
          </div>
        </div>

        <div className="account-field">
          <label htmlFor="new-password">Mật khẩu mới</label>
          <div className="change-password-input">
            <input
              id="new-password"
              name="newPassword"
              required
              minLength={8}
              type={showNewPassword ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder="Tạo mật khẩu mới"
            />
            <button
              className="password-toggle"
              type="button"
              aria-label={showNewPassword ? 'Ẩn mật khẩu mới' : 'Hiện mật khẩu mới'}
              aria-controls="new-password"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              <Icon icon={showNewPassword ? faEye : faEyeSlash} />
            </button>
          </div>
        </div>

        <div className="account-field">
          <label htmlFor="confirm-password">Xác nhận mật khẩu</label>
          <div className="change-password-input">
            <input
              id="confirm-password"
              name="confirmPassword"
              required
              minLength={8}
              type={showConfirmPassword ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder="Nhập lại mật khẩu mới"
            />
            <button
              className="password-toggle"
              type="button"
              aria-label={showConfirmPassword ? 'Ẩn mật khẩu xác nhận' : 'Hiện mật khẩu xác nhận'}
              aria-controls="confirm-password"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Icon icon={showConfirmPassword ? faEye : faEyeSlash} />
            </button>
          </div>
        </div>
      </fieldset>

      <div className="change-password-note">
        <h2>Hướng dẫn bảo mật</h2>
        <ul>
          {securityTips.map((tip) => (
            <li key={tip}><Icon icon={faCircleCheck} /><span>{tip}</span></li>
          ))}
        </ul>
      </div>

      <div className="account-form-actions">
        <p>Mật khẩu mới sẽ được áp dụng ngay sau khi cập nhật.</p>
        <div className="account-form-buttons">
          <button type="reset" disabled={saving}>Huỷ</button>
          <button type="submit" className="account-button-primary" disabled={saving}>{saving ? 'Đang cập nhật...' : 'Cập nhật mật khẩu'}</button>
        </div>
      </div>
    </form>
  )
}
