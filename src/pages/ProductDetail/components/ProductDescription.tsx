import { faHandSparkles, faLeaf, faShieldHalved } from '@fortawesome/free-solid-svg-icons'
import Icon from '../../../components/Icon'
import './ProductDescription.css'

interface Props {
  description: string
}

export default function ProductDescription({ description }: Props) {
  return (
    <section className="product-detail-panel product-description" aria-labelledby="product-description-title">
      <h2 id="product-description-title">Mô tả sản phẩm</h2>
      <div className="product-description-content">
        <p>{description}</p>
      </div>
      <div className="product-description-benefits">
        <span><Icon icon={faLeaf} /> 100% thành phần tự nhiên</span>
        <span><Icon icon={faShieldHalved} /> An toàn, dịu nhẹ</span>
        <span><Icon icon={faHandSparkles} /> Thủ công cho mọi làn da</span>
      </div>
    </section>
  )
}
