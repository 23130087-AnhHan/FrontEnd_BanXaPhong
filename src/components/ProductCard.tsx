import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faBagShopping } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import './ProductCard.css'

interface Product {
    id: number;
    name: string;
    catagory: string;
    price: number;
    unit: string;
    rating: number;
    soldCount: number;
    image: string;
    inStock: Boolean;
}

export default function ProductCard({ product }: { product: Product }) {
    return (
        <div className="card">
            <div className="card-img">
                <img src={product.image} alt={product.name} />
                <button className="btn-heart" type="button">
                    <FontAwesomeIcon icon={faHeart} />
                </button>
            </div>
            <div className="card-info">
                <h3 className="card-title">{product.name}</h3>

                <div className="card-meta">
                    <FontAwesomeIcon icon={faStar} className="meta-star" />
                    <span className="meta-rating">{product.rating}</span>
                    <span></span>
                    <span className="meta-sold">Đã bán {product.soldCount}</span>
                </div>

                <div className="card-price">
                    <strong>{product.price} đ</strong>
                    <span>/ {product.unit}</span>
                </div>

                <div className="card-actions">
                    <button className="btn-cart" type="button">
                        <FontAwesomeIcon icon={faBagShopping} />
                        Thêm giỏ
                    </button>
                    <button className="btn-buy" type="button">
                        Mua ngay
                    </button>
                </div>
            </div>
        </div>
    )
}