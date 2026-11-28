import { useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import type { AccountOrder } from '../../api/orderApi'
import { markOrderReturned } from '../../api/orderApi'
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
    const [isConfirmed, setIsConfirmed] = useState(false)
    const [selectedProductIds, setSelectedProductIds] = useState<string[]>([])
    const [error, setError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()
    const order = (location.state as { order?: AccountOrder } | null)?.order

        async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (!order || isSubmitting) return

        const formData = new FormData(event.currentTarget)
        const requiredFields = ['reason', 'description', 'bank', 'accountNumber', 'accountHolder']
        const hasAllFields = requiredFields.every((field) => String(formData.get(field) ?? '').trim().length > 0)
        if (selectedProductIds.length === 0) {
            setError('Vui lòng chọn ít nhất một sản phẩm muốn trả.')
            return
        }
        if (!hasAllFields) {
            setError('Vui lòng điền đầy đủ thông tin trả hàng và hoàn tiền.')
            return
        }
        if (!isConfirmed) {
            setError('Vui lòng xác nhận thông tin trước khi gửi yêu cầu.')
            return
        }

        setError('')
        setIsSubmitting(true)
        try {
            await markOrderReturned(order.id)
            navigate('/tai-khoan/don-hang', { replace: true, state: { returnRequestSubmitted: true } })
        } catch (submitError) {
            setError(submitError instanceof Error ? submitError.message : 'Không gửi được yêu cầu. Vui lòng thử lại.')
            setIsSubmitting(false)
        }
    }



    return (
        <div className="order-return-page">
            <div className="order-return-header">
                <h1>Trả hàng</h1>
                <p>Chọn sản phẩm đã nhận và cung cấp thông tin để Saponi hỗ trợ yêu cầu của bạn.</p>
            </div>

            <form className="order-return-layout" onSubmit={handleSubmit}>
                <div className="order-return-main">
                    <ReturnProducts key={order.id} order={order} onSelectedProductIdsChange={setSelectedProductIds} />
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
                        <button type="submit" className="btn-submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Đang gửi...' : 'Gửi yêu cầu'} {!isSubmitting && <FontAwesomeIcon icon={faArrowRight} />}
                        </button>
                    </div>
                    {error && <p className="return-request-error" role="alert">{error}</p>}
                </div>

                <div className="order-return-sidebar">
                    <InforOrder order={order} />
                    <ExpectedMoney />
                    <NoticeReturn />
                </div>
            </form>
        </div>
    )
}
