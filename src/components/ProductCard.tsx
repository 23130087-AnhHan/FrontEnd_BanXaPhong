import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faBagShopping } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { Link } from 'react-router-dom'
import './ProductCard.css'
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons'
import { useState } from 'react'

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
    const [isHobby, setIsHobby] = useState(false);
    return (
        <div className="card">
            <div className="card-img">
                <Link to={'/products/' + product.id} className="card-image-link">
                    <img src={product.image} alt={product.name} />
                </Link>

                <span className="card-discount-badge">-10%</span>
                <button className="btn-heart" type="button" onClick={() => setIsHobby(!isHobby)}>
                    <FontAwesomeIcon icon={isHobby ? faHeartRegular : faHeartSolid} />
                </button>
            </div>
            <div className="card-info">
                <h3 className="card-title"><Link to={'/products/' + product.id}>{product.name}</Link></h3>

                <div className="card-meta">
                    <FontAwesomeIcon icon={faStar} className="meta-star" />
                    <span className="meta-rating">{product.rating}</span>
                    <span></span>
                    <span className="meta-sold">Đã bán {product.soldCount}</span>
                </div>

                <div className="card-price">
                    <strong>{product.price.toLocaleString('vi-VN')} đ</strong>
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
