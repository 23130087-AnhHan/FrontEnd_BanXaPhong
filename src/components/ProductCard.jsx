import './ProductCard.css'

export default function ProductCard() {
    return (
        <div className="card">
            <div className="card-img-box">
                <img
                    src="https://tse2.mm.bing.net/th/id/OIP.dWw1lg2664Sh9O0ug4MhpAHaFM?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
                    alt="Xà phòng"
                />
                <button className="btn-heart"></button>
            </div>
            <div className="card-info">
                <h3>Xà phòng Oải hương Pháp</h3>

                <p className="card-meta">5.0     Đã bán 1.2k</p>
                <p className="card-price">
                    <strong>180.000 đ</strong> <span>/ bánh 100g</span>
                </p>
                <div className="card-actions">
                    <button className="btn-cart">Thêm giỏ</button>
                    <button className="btn-buy">Mua ngay</button>
                </div>
            </div>
        </div>
    )
}