import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import ProductCard from './ProductCard'
import './ProductList.css'

export default function ProductList() {
    const products = [
        {
            id: 1,
            name: 'Xà phòng Oải hương hữu cơ',
            category: 'Xà phòng',
            price: 180000,
            unit: 'bánh 100g',
            rating: 4.9,
            soldCount: '1.2k',
            image: 'https://img5.thuthuatphanmem.vn/uploads/2021/12/29/anh-trai-sau-rieng_042725668.jpg',
            inStock: true,
        },
        {
            id: 2,
            name: 'Xà phòng Mật ong & Yến mạch',
            category: 'Xà phòng',
            price: 165000,
            unit: 'bánh 100g',
            rating: 4.8,
            soldCount: '950',
            image: 'https://img5.thuthuatphanmem.vn/uploads/2021/12/29/anh-trai-sau-rieng_042725668.jpg',
            inStock: true,
        },
        {
            id: 3,
            name: 'Xà phòng Trà xanh nguyên chất',
            category: 'Xà phòng',
            price: 150000,
            unit: 'bánh 100g',
            rating: 5.0,
            soldCount: '1.5k',
            image: 'https://img5.thuthuatphanmem.vn/uploads/2021/12/29/anh-trai-sau-rieng_042725668.jpg',
            inStock: true,
        },
        {
            id: 4,
            name: 'Xà phòng Cam Ngọt & Quế',
            category: 'Xà phòng',
            price: 170000,
            unit: 'bánh 100g',
            rating: 4.9,
            soldCount: '820',
            image: 'https://img5.thuthuatphanmem.vn/uploads/2021/12/29/anh-trai-sau-rieng_042725668.jpg',
            inStock: false,
        }
    ];
    return (
        <div className="product-section">
            <div className="section-header">
                <div>
                    <span className="section-badge">BÁN CHẠY</span>
                    <h2 className="section-title">Top sản phẩm bán chạy nhất</h2>
                </div>
                <a href="/san-pham" className="view-all">
                    <span>Xem tất cả sản phẩm</span>
                    <FontAwesomeIcon icon={faChevronRight} />
                </a>
            </div>
            <div className="product-grid">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}