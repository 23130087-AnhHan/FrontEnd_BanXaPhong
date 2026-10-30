import { useRef, useState } from 'react'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass'
import { faBagShopping } from '@fortawesome/free-solid-svg-icons/faBagShopping'
import { faHeart } from '@fortawesome/free-regular-svg-icons/faHeart'
import { faUser } from '@fortawesome/free-regular-svg-icons/faUser'
import logo from '../assets/saponi-logo.png'
import Icon from './Icon'
import './Header.css'

const navigation = [
  { id: 'home', label: 'Trang chủ', href: '/' },
  { id: 'products', label: 'Sản phẩm', href: '/san-pham' },
  { id: 'offers', label: 'Ưu đãi', href: '/uu-dai' },
  { id: 'contact', label: 'Liên hệ', href: '/lien-he' },
]

// cartCount là dữ liệu do trang cha truyền vào
export default function Header({ activePage = 'home', cartCount = 0, onSearch }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuButtonRef = useRef(null)
  // Ví dụ: 3.7 thành 3; số âm hoặc giá trị không phải số thành 0.
  const itemCount = Math.max(0, Math.trunc(Number(cartCount) || 0))

  function handleSearch(event) {
    // Chưa có hàm tìm kiếm riêng thì mở trang sản phẩm kèm từ khóa đã nhập.
    if (!onSearch) return

    event.preventDefault()
    // Đọc chữ người dùng vừa nhập trong ô tìm kiếm.
    const formData = new FormData(event.currentTarget)
    onSearch(String(formData.get('q') || '').trim())
  }

  function closeMenuOnEscape(event) {
    if (event.key === 'Escape' && isMenuOpen) {
      setIsMenuOpen(false)
      // Sau khi đóng menu, phím Tab sẽ di chuyển tiếp từ nút mở menu.
      menuButtonRef.current?.focus()
    }
  }

  return (
    <header className="site-header" onKeyDown={closeMenuOnEscape}>
      <div className="site-header__container">
        <div className="site-header__identity">
          <button
            ref={menuButtonRef}
            className="site-header__menu-toggle"
            type="button"
            aria-label={isMenuOpen ? 'Đóng menu' : 'Mở menu'}
            aria-expanded={isMenuOpen}
            aria-controls="main-navigation"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="site-header__menu-icon" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>

          <a className="site-header__brand" href="/" aria-label="Saponi — Trang chủ">
            <img className="site-header__logo" src={logo} alt="" width="40" height="40" />
            <span className="site-header__brand-name">Saponi</span>
          </a>

          <nav
            id="main-navigation"
            className={`site-header__nav${isMenuOpen ? ' site-header__nav--open' : ''}`}
            aria-label="Điều hướng chính"
          >
            {navigation.map((item) => (
              <a
                key={item.id}
                className="site-header__nav-link"
                href={item.href}
                aria-current={activePage === item.id ? 'page' : undefined}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <form
          className="site-header__search"
          role="search"
          aria-label="Tìm kiếm sản phẩm"
          action="/san-pham"
          method="get"
          onSubmit={handleSearch}
        >
          <div className="site-header__search-field">
            <button className="site-header__search-submit" type="submit" aria-label="Tìm kiếm">
              <Icon
                className="site-header__icon site-header__icon--search"
                icon={faMagnifyingGlass}
              />
            </button>
            <input
              className="site-header__search-input"
              type="search"
              name="q"
              aria-label="Tìm kiếm xà phòng"
              placeholder="Tìm kiếm xà phòng thủ công, hương liệu thiên nhiên..."
            />
          </div>
        </form>

        <div className="site-header__actions">
          <a
            className="site-header__action site-header__wishlist"
            href="/yeu-thich"
            aria-label="Sản phẩm yêu thích"
          >
            <Icon className="site-header__icon site-header__icon--heart" icon={faHeart} />
          </a>
          <a
            className="site-header__action site-header__cart"
            href="/gio-hang"
            aria-label={`Giỏ hàng, ${itemCount} sản phẩm`}
          >
            <Icon className="site-header__icon site-header__icon--cart" icon={faBagShopping} />
            {itemCount > 0 && (
              <span className="site-header__cart-count" aria-hidden="true">
                {itemCount > 99 ? '99+' : itemCount}
              </span>
            )}
          </a>
          <a
            className="site-header__action site-header__account"
            href="/tai-khoan"
            aria-label="Tài khoản"
          >
            <Icon className="site-header__icon site-header__icon--user" icon={faUser} />
          </a>
        </div>
      </div>
    </header>
  )
}
