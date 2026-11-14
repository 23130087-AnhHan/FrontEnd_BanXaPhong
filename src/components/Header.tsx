import { useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass'
import { faBagShopping } from '@fortawesome/free-solid-svg-icons/faBagShopping'
import { faHeart } from '@fortawesome/free-regular-svg-icons/faHeart'
import logo from '../assets/saponi-logo.png'
import Icon from './Icon'
import AccountDropdown from './AccountDropdown'
import './Header.css'

interface HeaderProps {
  activePage?: 'home' | 'products' | 'offers' | 'contact'
  cartCount?: number
}

const navigation = [
  { id: 'home', label: 'Trang chủ', href: '/' },
  { id: 'products', label: 'Sản phẩm', href: '/products' },
  { id: 'offers', label: 'Ưu đãi', href: '/offer' },
  { id: 'contact', label: 'Liên hệ', href: '/contact' },
]

export default function Header({ activePage, cartCount = 0 }: HeaderProps) {
  const location = useLocation()
  const currentPage = activePage || navigation.find((item) => item.href === location.pathname)?.id
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  function closeMenuOnEscape(event: KeyboardEvent<HTMLElement>) {
    if (event.key === 'Escape' && isMenuOpen) {
      setIsMenuOpen(false)
      menuButtonRef.current?.focus()
    }
  }

  return (
    <header className="header" onKeyDown={closeMenuOnEscape}>
      <div className="header-container">
        <div className="header-left">
          <button
            ref={menuButtonRef}
            className="header-menu"
            type="button"
            aria-label={isMenuOpen ? 'Đóng menu' : 'Mở menu'}
            aria-expanded={isMenuOpen}
            aria-controls="header-navigation"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Icon icon={faBars} />
          </button>
          <a className="header-brand" href="/" aria-label="Saponi — Trang chủ">
            <img src={logo} alt="" width="40" height="40" />
            <span>Saponi</span>
          </a>
          <nav
            id="header-navigation"
            className={'header-nav' + (isMenuOpen ? ' open' : '')}
            aria-label="Điều hướng chính"
          >
            {navigation.map((item) => (
              <a
                key={item.id}
                href={item.href}
                aria-current={currentPage === item.id ? 'page' : undefined}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <form className="header-search" role="search" action="/san-pham" method="get">
          <button type="submit" aria-label="Tìm kiếm">
            <Icon icon={faMagnifyingGlass} />
          </button>
          <input
            type="search"
            name="q"
            aria-label="Tìm kiếm xà phòng"
            placeholder="Tìm kiếm xà phòng thủ công, hương liệu thiên nhiên..."
          />
        </form>

        <div className="header-actions">
          <a href="/hobby" aria-label="Sản phẩm yêu thích">
            <Icon icon={faHeart} />
          </a>
          <Link to="/gio-hang" aria-label={'Giỏ hàng, ' + cartCount + ' sản phẩm'}>
            <Icon icon={faBagShopping} />
            {cartCount > 0 && (
              <span className="header-count" aria-hidden="true">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </Link>
          <AccountDropdown />
        </div>
      </div>
    </header>
  )
}
