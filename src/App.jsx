import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'

export default function App() {
  return (
    <>
      {/* Số lượng mẫu theo thiết kế Figma, thay bằng dữ liệu giỏ hàng khi tích hợp. */}
      <Header cartCount={2} />
      <main>
        <HomePage />
      </main>
      <Footer />
    </>
  )
}
