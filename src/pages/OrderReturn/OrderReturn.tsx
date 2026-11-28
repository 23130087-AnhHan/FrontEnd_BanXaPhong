import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import type { AccountOrder } from '../../api/orderApi'
import ReturnProducts from './components/ReturnProducts'
import InforOrder from './components/InforOrder'
import ExpectedMoney from './components/ExpectedMoney'
import ReasonReturn from './components/ReasonReturn'
import MethodReturn from './components/MethodReturn'
import NoticeReturn from './components/NoticeReturn'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faCheck } from '@fortawesome/free-solid-svg-icons'
import './OrderReturn.css'

export default function OrderReturn() {
    const [isConfirmed, setIsConfirmed] = useState(true)
    const location = useLocation()
    const order = (location.state as { order?: AccountOrder } | null)?.order


    return (
        <div className="order-return-page">
            <div className="order-return-header">
                <h1>Trả hàng</h1>
                <p>Chọn sản phẩm đã nhận và cung cấp thông tin để Saponi hỗ trợ yêu cầu của bạn.</p>
            </div>

            <div className="order-return-layout">
                <div className="order-return-main">
                    <ReturnProducts key={order.id} order={order} />
                    <ReasonReturn />
                    <MethodReturn />

                    <label className="return-confirm" onClick={() => setIsConfirmed(!isConfirmed)}>
                        <div className={`confirm-checkbox ${isConfirmed ? 'checked' : ''}`}>
                            {isConfirmed && <FontAwesomeIcon icon={faCheck} />}
                        </div>
                        <span>
                            Tôi xác nhận thông tin đã cung cấp là chính xác và đồng ý để Saponi liên hệ xác minh yêu cầu.
                        </span>
                    </label>

                    <div className="btn-group">
                        <Link to="/tai-khoan/don-hang" className="btn-back">Quay lại đơn hàng</Link>
                        <button type="button" className="btn-submit">
                            Gửi yêu cầu <FontAwesomeIcon icon={faArrowRight} />
                        </button>
                    </div>
                </div>

                <div className="order-return-sidebar">
                    <InforOrder order={order} />
                    <ExpectedMoney />
                    <NoticeReturn />
                </div>
            </div>
        </div>
    )
}
