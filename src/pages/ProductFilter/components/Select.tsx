import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import './Select.css'

interface SelectSortItem {
    id: number;
    content: string;
}

export default function SelectSort({ content = [] }: { content: SelectSortItem[] }) {
    return (
        <div className="select-sort-wrap">
            <select>
                {content.map((i) => (
                    <option key={i.id} value={i.id}>{i.content}</option>
                ))}
            </select>
            <FontAwesomeIcon icon={faChevronDown} className="select-sort-icon" />
        </div>
    )
}