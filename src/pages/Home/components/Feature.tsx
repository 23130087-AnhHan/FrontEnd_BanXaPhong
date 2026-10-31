import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { IconProp } from '@fortawesome/fontawesome-svg-core'
import './Feature.css'
interface FeatureItem {
    id: number;
    icon: IconProp;
    content: string;
}

export default function Feature({ feature = [] }: { feature: FeatureItem[] }) {
    return (
        <a className="feature-container">
            {feature.map((feature) => (
                <div className="feature" key={feature.id}>
                    <div className="feature-icon">
                        <FontAwesomeIcon icon={feature.icon} />
                    </div>
                    <div className="feature-content">{feature.content}</div>
                </div>
            ))}
        </a>
    )
}