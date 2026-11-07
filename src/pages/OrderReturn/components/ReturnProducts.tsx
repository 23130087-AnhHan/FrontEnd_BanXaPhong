import { useState } from 'react'
import ReturnItem from './ReturnItem'
import './ReturnProducts.css'

const initialProducts = [
    {
        id: 1,
        name: 'Xà phòng Oải hương hữu cơ',
        desc: '100g - Đã mua: 2 · 180.000 đ / sản phẩm',
        price: '180.000 đ',
        image: 'https://img5.thuthuatphanmem.vn/uploads/2021/12/29/anh-trai-sau-rieng_042725668.jpg',
        selected: true,
        quantity: 1,
    },
    {
        id: 2,
        name: 'Xà phòng Trà xanh nguyên chất',
        desc: '200g - Đã mua: 1 · 150.000 đ / sản phẩm',
        price: '150.000 đ',
        image: 'https://img5.thuthuatphanmem.vn/uploads/2021/12/29/anh-trai-sau-rieng_042725668.jpg',
        selected: false,
        quantity: 1,
    },
    {
        id: 3,
        name: 'Xà phòng Đất sét hoa hồng',
        desc: '100g - Đã mua: 1 · 195.000 đ / sản phẩm',
        price: '195.000 đ',
        image: 'https://img5.thuthuatphanmem.vn/uploads/2021/12/29/anh-trai-sau-rieng_042725668.jpg',
        selected: true,
        quantity: 1,
    },
]

export default function ReturnProducts() {
    const [items, setItems] = useState(initialProducts)

    return (
        <div className="return-box">
            <h2>Sản phẩm muốn trả</h2>
            <p className="return-subtitle">Chọn sản phẩm và số lượng trong đơn hàng đã giao.</p>

            <div className="return-list">
                {items.map((item) => (
                    <ReturnItem key={item.id} item={item} />
                ))}
            </div>

            <p className="return-total">Đã chọn 2 sản phẩm - Tổng số lượng trả: 2</p>
        </div>
    )
}