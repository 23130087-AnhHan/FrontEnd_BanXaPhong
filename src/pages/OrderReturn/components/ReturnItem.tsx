import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import './ReturnItem.css'

interface ReturnItemData {
    id: string
    name: string
    image: string
    desc: string
    price: string
    selected: boolean
    quantity: number
    returnQuantity: number
}

export default function ReturnItem({ item, onToggle, onQuantityChange }: { item: ReturnItemData; onToggle: () => void; onQuantityChange: (delta: number) => void }) {
    return (
        <div className={`return-card ${item.selected ? 'active' : ''}`}>
            <div className="return-card-top" role="checkbox" aria-checked={item.selected} tabIndex={0} onClick={onToggle} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onToggle() } }}>
                <div className={`return-checkbox ${item.selected ? 'checked' : ''}`}>
                    {item.selected && <FontAwesomeIcon icon={faCheck} />}
                </div>

                <img src={item.image} alt={item.name} className="return-img" />

                <div className="return-info">
                    <h4>{item.name}</h4>
                    <p>{item.desc}</p>
                </div>
            </div>

            {item.selected && (
                <div className="return-card-bottom">
                    <div className="return-qty">
                        <span>Số lượng trả</span>
                        <div className="qty-control">
                            <button type="button" aria-label="Giảm số lượng trả" disabled={item.returnQuantity <= 1} onClick={(event) => { event.stopPropagation(); onQuantityChange(-1) }}>
                                <FontAwesomeIcon icon={faMinus} />
                            </button>
                            <span>{item.returnQuantity}</span>
                            <button type="button" aria-label="Tăng số lượng trả" disabled={item.returnQuantity >= item.quantity} onClick={(event) => { event.stopPropagation(); onQuantityChange(1) }}>
                                <FontAwesomeIcon icon={faPlus} />
                            </button>
                        </div>
                    </div>

                    <strong className="return-price">{item.price}</strong>
                </div>
            )}
        </div>
    )
}
