import { Link } from 'react-router-dom'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight'
import Icon from '../../../components/Icon'
import ProductList from '../../../components/ProductList'
import './RecommendedProducts.css'

const productImage = 'https://img5.thuthuatphanmem.vn/uploads/2021/12/29/anh-trai-sau-rieng_042725668.jpg'

const products = [
  {
    id: 2,
    name: 'Xà phòng Mật ong',
    price: 175000,
    rating: 4.9,
    soldCount: 980,
    unit: 'bánh 100g',
    image: productImage,
  },
  {
    id: 3,
    name: 'Xà phòng Trà xanh Matcha',
    price: 165000,
    rating: 4.9,
    soldCount: '2.4k',
    unit: 'bánh 100g',
    image: productImage,
  },
  {
    id: 5,
    name: 'Xà phòng Than tre',
    price: 170000,
    rating: 4.8,
    soldCount: '1.5k',
    unit: 'bánh 100g',
    image: productImage,
  },
  {
    id: 7,
    name: 'Xà phòng Hoa hồng',
    price: 190000,
    rating: 5.0,
    soldCount: 960,
    unit: 'bánh 100g',
    image: productImage,
  },
]

export default function RecommendedProducts() {
  return (
    <section className="order-recommendations" aria-labelledby="order-recommendations-title">
      <div className="order-recommendations-heading">
        <h2 id="order-recommendations-title">Có thể bạn sẽ thích</h2>
        <Link to="/products">Xem tất cả bộ sưu tập <Icon icon={faArrowRight} /></Link>
      </div>
      <ProductList products={products} />
    </section>
  )
}
