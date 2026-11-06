interface Content {
    badge: string;
    title: string;
}

export default function HobbyTitle({ content }: { content: Content }) {
    return (
        <div className="section-header">
            <div>
                <h2 className="section-title">{content.title}</h2>
                <span className="section-badge">{content.badge}</span>
            </div>
        </div>
    )
}