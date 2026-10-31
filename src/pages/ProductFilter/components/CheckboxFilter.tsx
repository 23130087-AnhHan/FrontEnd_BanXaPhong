export interface FilterItem {
    id: number;
    content: string;
}

interface CheckboxFilterProps {
    items: FilterItem[];
}

export default function CheckboxFilter({ items = [] }: CheckboxFilterProps) {
    return (
        <div className="filter-group">
            {items.map((item) => (
                <div key={item.id} className="checkbox-item">
                    <input type="checkbox" name="category" value={item.content} />
                    <label>{item.content}</label>
                </div>
            ))}
        </div>
    );
}