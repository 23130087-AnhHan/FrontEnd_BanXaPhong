import { Link } from 'react-router-dom'

export default function NeedHelp() {
    return (
        <div>
            <div className="notice-help">

                <span>Cần trợ giúp? <Link to="/contact">Liên hệ Saponi</Link></span>
            </div>
        </div>
    )
}