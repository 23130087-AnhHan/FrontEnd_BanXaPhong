import { Link } from 'react-router-dom'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import Icon from '../../../components/Icon'
import ProductList from '../../../components/ProductList'
import './ProductSuggestions.css'

const suggestedProducts = [
  {
    id: 2,
    name: 'Xà phòng Mật ong',
    price: 175000,
    unit: 'bánh 100g',
    rating: 4.9,
    soldCount: 890,
    image: 'https://img5.thuthuatphanmem.vn/uploads/2021/12/29/anh-trai-sau-rieng_042725668.jpg',
  },
  {
    id: 3,
    name: 'Xà phòng Trà xanh Matcha',
    price: 165000,
    unit: 'bánh 100g',
    rating: 4.9,
    soldCount: 1200,
    image: 'https://img5.thuthuatphanmem.vn/uploads/2021/12/29/anh-trai-sau-rieng_042725668.jpg',
  },
  {
    id: 5,
    name: 'Xà phòng Than tre',
    price: 170000,
    unit: 'bánh 100g',
    rating: 4.8,
    soldCount: 650,
    image: 'https://img5.thuthuatphanmem.vn/uploads/2021/12/29/anh-trai-sau-rieng_042725668.jpg',
  },
  {
    id: 7,
    name: 'Xà phòng Hoa hồng',
    price: 195000,
    unit: 'bánh 100g',
    rating: 5.0,
    soldCount: 920,
    image: 'https://img5.thuthuatphanmem.vn/uploads/2021/12/29/anh-trai-sau-rieng_042725668.jpg',
  },
]

export default function ProductSuggestions() {
  return (
    <section className="product-suggestions" aria-labelledby="product-suggestions-title">
      <div className="product-suggestions-heading">
        <h2 id="product-suggestions-title">Gợi ý sản phẩm</h2>
        <Link to="/products">Xem tất cả bộ sưu tập <Icon icon={faArrowRight} /></Link>
      </div>
      <ProductList products={suggestedProducts} />
    </section>
  )
}
