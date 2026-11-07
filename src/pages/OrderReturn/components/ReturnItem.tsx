import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import './ReturnItem.css'

export default function ReturnItem({ item }: any) {
    return (
        <div className={`return-card ${item.selected ? 'active' : ''}`}>
            <div className="return-card-top">
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
                            <button type="button" >
                                <FontAwesomeIcon icon={faMinus} />
                            </button>
                            <span>{item.quantity}</span>
                            <button type="button" >
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
