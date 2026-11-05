import { useState } from 'react'

interface OfferItem {
    id: number
    content: string
}

export default function OptionOffering({ items = [] }: { items: OfferItem[] }) {
    const [activeId, setActiveId] = useState<number>(1)

    return (
        <div className="offer-pills">
            {items.map((item) => (
                <button key={item.id} type="button"
                    className={`offer-pill${activeId === item.id ? ' active' : ''}`}
                    onClick={() => setActiveId(item.id)} >
                    {item.content}
                </button>
            ))}
        </div>
    )
}
