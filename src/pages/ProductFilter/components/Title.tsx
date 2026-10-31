interface Title {
    id: number;
    name: string;
}
export default function Title({ title }: { title: Title }) {
    return (
        <h4 className="filter-title">{title.name}</h4>
    )
}