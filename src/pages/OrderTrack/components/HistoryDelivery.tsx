import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import './HistoryDelivery.scss'

const historyEvents = [
    {
        id: 1,
        time: '16:10',
        date: '28/10',
        title: 'Đã đến bưu cục Phú Nhuận',
        desc: 'GHN Phú Nhuận, TP. Hồ Chí Minh. Kiện hàng đang được phân loại để chuyển sang bước giao đến bạn.',
        isLatest: true,
    },
    {
        id: 2,
        time: '15:20',
        date: '28/10',
        title: 'Đã bàn giao cho đơn vị vận chuyển',
        desc: 'Giao Hàng Nhanh (GHN) đã tiếp nhận kiện hàng từ Saponi.',
        isLatest: false,
    },
    {
        id: 3,
        time: '15:00',
        date: '28/10',
        title: 'Đã đóng gói kiện hàng',
        desc: 'Saponi đã chuẩn bị và đóng gói sản phẩm để bàn giao cho GHN.',
        isLatest: false,
    },
    {
        id: 4,
        time: '14:35',
        date: '28/10',
        title: 'Đơn hàng đã được xác nhận',
        desc: 'Saponi đã xác nhận đơn hàng #SPN-84920 của bạn.',
        isLatest: false,
    },
]

export default function HistoryDelivery() {
    return (
        <div className="history-delivery-card">
            <h2>Lịch sử vận chuyển</h2>
            <hr />

            <div className="timeline">
                {historyEvents.map((event) => (
                    <div key={event.id} className="timeline-item">
                        <div className={`time-col ${event.isLatest ? 'latest' : ''}`}>
                            <strong>{event.time}</strong>
                            <span>{event.date}</span>
                        </div>

                        <div className="timeline-node">
                            <div className={`node-circle ${event.isLatest ? 'latest' : 'done'}`}>
                                {event.isLatest ?
                                    (<div className="inner-dot" />)
                                    :
                                    (<FontAwesomeIcon icon={faCheck} />)}
                            </div>
                            <div className="line" />
                        </div>

                        <div className="content-col">
                            <div className={`title-row ${event.isLatest ? 'latest' : ''}`}>
                                <h4>{event.title}</h4>
                                {event.isLatest && <span className="badge">Mới nhất</span>}
                            </div>
                            <p>{event.desc}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="next-step-box">
                <div className="box-icon">

                </div>
                <div className="box-text">
                    <strong>Tiếp theo: Đang giao đến bạn</strong>
                    <span>Nhân viên giao hàng sẽ liên hệ trước khi giao.</span>
                </div>
            </div>
        </div>
    )
}
