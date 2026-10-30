import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

interface Content {
    badge: string;
    title: string;
}

export default function HomeTitle({ content }: { content: Content }) {
    return (
        <div className="section-header">
            <div>
                <span className="section-badge">{content.badge}</span>
                <h2 className="section-title">{content.title}</h2>
            </div>
            <a href="/san-pham" className="view-all">
                <span>Xem tất cả sản phẩm</span>
                <FontAwesomeIcon icon={faChevronRight} />
            </a>
        </div>
    )
}