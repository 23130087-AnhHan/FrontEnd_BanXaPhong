interface Content {
    id: number,
    content: string
}
export default function OptionButton({ items = [] }: { items: any[] }) {
    return (
        <div>
            {items.map(i => (
                <button key={i.id}>{i.content}</button>
            ))}
        </div>
    )
}
