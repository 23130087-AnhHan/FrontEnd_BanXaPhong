import type { Product } from '../data/products'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../store/store'
import { addToCart } from '../store/cartSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faBagShopping } from '@fortawesome/free-solid-svg-icons'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { layNguoiDungHienTai } from '../api/authApi'
import './ProductCard.css'
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons'
import { useState } from 'react'



export default function ProductCard({ product }: { product: Product }) {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const location = useLocation()
    const user = layNguoiDungHienTai()
    const { items, status, saving } = useSelector((state: RootState) => state.cart)
    const quantity = items.find((item) => String(item.productId) === String(product.id))?.quantity ?? 0
    const [isHobby, setIsHobby] = useState(false);

    function addProduct() {
        if (!layNguoiDungHienTai()) {
            navigate('/login', { state: { from: location.pathname + location.search } })
            return
        }
        dispatch(addToCart(product))
    }

    return (
        <div className="card">
            <div className="card-img">
                <Link to={'/products/' + product.id} className="card-image-link">
                    <img
                        src={product.image}
                        alt={product.name}
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1607006314644-8cbdf6a94f6c?auto=format&fit=crop&w=600&q=80'
                        }}
                    />
                </Link>

                {product.oldPrice != null && product.oldPrice > product.price && (
                    <span className="card-discount-badge">-{Math.round((1 - product.price / product.oldPrice) * 100)}%</span>
                )}
                <button className="btn-heart" type="button" onClick={() => setIsHobby(!isHobby)}>
                    <FontAwesomeIcon icon={isHobby ? faHeartRegular : faHeartSolid} />
                </button>
            </div>
            <div className="card-info">
                <h3 className="card-title"><Link to={'/products/' + product.id}>{product.name}</Link></h3>

                <div className="card-meta">
                    <FontAwesomeIcon icon={faStar} className="meta-star" />
                    <span className="meta-rating">{product.rating ?? 5}</span>
                    <span></span>
                    <span className="meta-sold">Đã bán {product.soldCount ?? 0}</span>
                </div>

                <div className="card-price">
                    <strong>{product.price.toLocaleString('vi-VN')} đ</strong>
                    <span>/ {product.unit || 'bánh'}</span>
                </div>

                <div className="card-actions">
                    <button
                        className="btn-cart"
                        type="button"
                        aria-label={'Thêm ' + product.name + ' vào giỏ hàng'}
                        disabled={product.inStock === false || (Boolean(user) && (status !== 'succeeded' || saving || quantity >= 99))}
                        onClick={addProduct}
                    >
                        <FontAwesomeIcon icon={faBagShopping} />
                        {product.inStock === false ? 'Hết hàng' : 'Thêm giỏ'}
                    </button>
                    <button className="btn-buy" type="button">
                        Mua ngay
                    </button>
                </div>
            </div>
        </div>
    )
}
