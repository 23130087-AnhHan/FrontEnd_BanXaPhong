import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTruck, faCheck, faBox, faHouse } from '@fortawesome/free-solid-svg-icons'
import './OrderStatus.scss'

const steps = [
    {
        id: 1,
        title: 'Đã xác nhận',
        time: '14:35, 28/10',
        status: 'completed',
        icon: faCheck,
    },
    {
        id: 2,
        title: 'Đã bàn giao GHN',
        time: '15:20, 28/10',
        status: 'completed',
        icon: faCheck,
    },
    {
        id: 3,
        title: 'Đang vận chuyển',
        time: '16:10, 28/10',
        status: 'active',
        icon: faTruck,
    },
    {
        id: 4,
        title: 'Đang giao đến bạn',
        time: 'Chưa đến bước này',
        status: 'pending',
        icon: faBox,
    },
    {
        id: 5,
        title: 'Giao thành công',
        time: 'Chưa đến bước này',
        status: 'pending',
        icon: faHouse,
    },
]

export default function OrderStatus() {
    return (
        <div className="order-status-card">

            <div className="status-top">
                <div className="current-info">
                    <div className="truck-icon-circle">
                        <FontAwesomeIcon icon={faTruck} />
                    </div>

                    <div className="status-text">
                        <span className="badge">
                            <span className="dot" /> TRẠNG THÁI HIỆN TẠI
                        </span>
                        <h2>Đang vận chuyển</h2>
                        <p className="desc">Kiện hàng đã đến bưu cục GHN Phú Nhuận.</p>
                        <p className="updated-time">Cập nhật gần nhất: 16:10, 28/10/2024</p>
                    </div>
                </div>

                <div className="eta-box">
                    <div className="eta-header">
                        <span>DỰ KIẾN NHẬN HÀNG</span>
                    </div>
                    <p className="eta-date">Hôm nay, 28/10/2024</p>
                    <p className="eta-time">17:00 – 18:00</p>
                    <p className="eta-note">Thời gian có thể thay đổi theo thực tế giao nhận.</p>
                </div>
            </div>

            <hr className="timeline-divider" />

            <div className="status-timeline">
                {steps.map((step, index) => (
                    <div key={step.id} className="step-item">
                        <div className="step-node">
                            <div className={`step-circle ${step.status}`}>
                                <FontAwesomeIcon icon={step.icon} />
                            </div>
                            {index < steps.length - 1 && (
                                <div className={`step-line ${step.status === 'completed'
                                    && steps[index + 1]?.status !== 'pending' ? 'active' : ''}`} />
                            )}
                        </div>

                        <div className="step-info">
                            <span className={`step-title ${step.status}`}>{step.title}</span>
                            <span className={`step-desc ${step.status}`}>{step.time}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}