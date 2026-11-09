import OrderStatus from './components/OrderStatus'
import HistoryDelivery from './components/HistoryDelivery'
import './OrderTrack.scss'

export default function OrderTrack() {
    return (
        <div className="order-track-page">
            <div className="order-track-container">
                <h1 className="page-title">Theo dõi đơn hàng</h1>
                <OrderStatus />
                <HistoryDelivery />
            </div>
        </div>
    )
}