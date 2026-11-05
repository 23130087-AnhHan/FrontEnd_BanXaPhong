import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { faUser } from '@fortawesome/free-regular-svg-icons/faUser'
import { faHeart } from '@fortawesome/free-regular-svg-icons/faHeart'
import { faBagShopping } from '@fortawesome/free-solid-svg-icons/faBagShopping'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons/faLocationDot'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons/faArrowRightFromBracket'
import Icon from './Icon'
import './AccountDropdown.css'

export default function AccountDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)
  const buttonRef = useRef(null)

  useEffect(() => {
    function closeOnOutsideClick(event) {
      if (!dropdownRef.current?.contains(event.target)) setIsOpen(false)
    }

    document.addEventListener('pointerdown', closeOnOutsideClick)
    return () => document.removeEventListener('pointerdown', closeOnOutsideClick)
  }, [])

  function closeOnEscape(event) {
    if (event.key === 'Escape' && isOpen) {
      event.stopPropagation()
      setIsOpen(false)
      buttonRef.current?.focus()
    }
  }

  return (
    <div className="account-menu" ref={dropdownRef} onKeyDown={closeOnEscape}>
      <button
        ref={buttonRef}
        className="header-account"
        type="button"
        aria-label="Tài khoản"
        aria-expanded={isOpen}
        aria-controls="account-dropdown"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Icon icon={faUser} />
      </button>

      {isOpen && (
        <div className="account-dropdown" id="account-dropdown">
          <div className="account-user">
            <div className="account-avatar"><Icon icon={faUser} /></div>
            <div className="account-info">
              <strong>Nguyễn Văn Anh Hàn</strong>
              <span>nguyenhan.be.dev@gmail.com</span>
            </div>
          </div>

          <div className="account-links">
            <Link to="/tai-khoan" onClick={() => setIsOpen(false)}>
              <Icon icon={faUser} />
              Hồ sơ cá nhân
            </Link>
            <Link to="/tai-khoan/don-hang" onClick={() => setIsOpen(false)}>
              <Icon icon={faBagShopping} />
              Đơn hàng của tôi
            </Link>
            <Link to="/tai-khoan/dia-chi" onClick={() => setIsOpen(false)}>
              <Icon icon={faLocationDot} />
              Sổ địa chỉ
            </Link>
            <button type="button" onClick={() => setIsOpen(false)}>
              <Icon icon={faHeart} />
              Sản phẩm đã thích
            </button>
          </div>

          <div className="account-footer">
            <button type="button" onClick={() => setIsOpen(false)}>
              <Icon icon={faArrowRightFromBracket} />
              Đăng xuất
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
