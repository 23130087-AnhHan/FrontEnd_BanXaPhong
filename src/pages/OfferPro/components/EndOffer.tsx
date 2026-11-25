import { useNavigate } from 'react-router-dom'
import './EndOffer.scss'

export default function EndOffer() {
    const navigate = useNavigate()

    return (
        <div className="product-end">
            <p>Bạn đã xem tất cả 6 sản phẩm ưu đãi</p>
            <button type="button" onClick={() => navigate('/products')}>
                Khám phá tất cả sản phẩm
            </button>
        </div>
    )
}
