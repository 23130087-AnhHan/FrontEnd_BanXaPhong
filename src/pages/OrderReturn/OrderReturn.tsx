import ReturnProducts from './components/ReturnProducts'
import './OrderReturn.css'

export default function OrderReturn() {
    return (
        <div className="order-return-page">
            <div className="order-return-header">
                <h1>Trả hàng</h1>
                <p>Chọn sản phẩm đã nhận và cung cấp thông tin Saponi hỗ trợ yêu cầu của bạn</p>
            </div>

            <ReturnProducts />
        </div>
    )
}
