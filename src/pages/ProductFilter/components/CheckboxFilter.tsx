export interface FilterItem {
    id: number | string;
    content: string;
}

interface CheckboxFilterProps {
    items: FilterItem[];
    selectedIds?: (string | number)[];
    onToggle?: (id: string | number) => void;
}

export default function CheckboxFilter({ items = [], selectedIds = [], onToggle }: CheckboxFilterProps) {
    return (
        <div className="filter-group">
            {items.map((item) => {
                const isChecked = selectedIds.includes(item.id)
                return (
                    <div key={item.id} className="checkbox-item">
                        <input
                            type="checkbox"
                            id={`filter-${item.id}`}
                            name="category"
                            value={String(item.id)}
                            checked={isChecked}
                            onChange={() => onToggle && onToggle(item.id)}
                        />
                        <label htmlFor={`filter-${item.id}`}>{item.content}</label>
                    </div>
                )
            })}
        </div>
    );
}