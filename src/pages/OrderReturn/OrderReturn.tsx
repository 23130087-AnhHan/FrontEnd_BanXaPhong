import ReturnProducts from './components/ReturnProducts'
import InforOrder from './components/InforOrder'
import ExpectedMoney from './components/ExpectedMoney'
import './OrderReturn.css'

export default function OrderReturn() {
    return (
        <div className="order-return-page">
            <div className="order-return-header">
                <h1>Trả hàng</h1>
                <p>Chọn sản phẩm đã nhận và cung cấp thông tin để Saponi hỗ trợ yêu cầu của bạn.</p>
            </div>

            <div className="order-return-layout">
                <div className="order-return-main">
                    <ReturnProducts />
                </div>

                <div className="order-return-sidebar">
                    <InforOrder />
                    <ExpectedMoney />
                </div>
            </div>
        </div>
    )
}
