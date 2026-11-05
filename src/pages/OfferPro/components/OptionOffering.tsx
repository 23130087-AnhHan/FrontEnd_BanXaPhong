interface OfferItem {
    id: number
    content: string
}

export default function OptionOffering({ items = [] }: { items: OfferItem[] }) {
    return (
        <div className="offer-pills">
            {items.map((item) => (
                <a key={item.id} type="button">
                    {item.content}
                </a>
            ))}
        </div>
    )
}
