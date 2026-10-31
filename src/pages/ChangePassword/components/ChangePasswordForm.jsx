import { useState } from 'react'
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

  return (
    <form className="change-password-form" aria-labelledby="change-password-title">
      <div className="change-password-heading">
        <h1 id="change-password-title">Đổi mật khẩu</h1>
        <p>Cập nhật mật khẩu mới để tăng cường bảo mật cho tài khoản của bạn.</p>
      </div>

      <div className="change-password-fields">
        <div className="change-password-field">
          <label htmlFor="current-password">Mật khẩu hiện tại</label>
          <div className="change-password-input">
            <input
              id="current-password"
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

        <div className="change-password-field">
          <label htmlFor="new-password">Mật khẩu mới</label>
          <div className="change-password-input">
            <input
              id="new-password"
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

        <div className="change-password-field">
          <label htmlFor="confirm-password">Xác nhận mật khẩu</label>
          <div className="change-password-input">
            <input
              id="confirm-password"
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
      </div>

      <div className="change-password-note">
        <h2>Hướng dẫn bảo mật</h2>
        <ul>
          {securityTips.map((tip) => (
            <li key={tip}><Icon icon={faCircleCheck} /><span>{tip}</span></li>
          ))}
        </ul>
      </div>

      <div className="change-password-actions">
        <p>Mật khẩu mới sẽ được áp dụng ngay sau khi cập nhật.</p>
        <div className="change-password-buttons">
          <button type="reset">Huỷ</button>
          <button type="button" className="change-password-submit">Cập nhật mật khẩu</button>
        </div>
      </div>
    </form>
  )
}
