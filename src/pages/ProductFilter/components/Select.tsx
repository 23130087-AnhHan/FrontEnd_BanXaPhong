
interface SelectSort {
    id: number;
    content: string;
}

export default function SelectSort({ content = [] }: { content: any[] }) {
    return (
        <select >
            {content.map((i) => (
                <option >{i.content}</option>
            ))}
        </select>
    )
}