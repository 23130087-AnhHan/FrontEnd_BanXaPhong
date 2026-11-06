import HomeTitle from "../../components/HomeTitle"
import OptionOffering from "../OfferPro/components/OptionOffering"
import SelectSort from "../ProductFilter/components/Select"
import ProductList from "../../components/ProductList"
import { selectSort } from "../OfferPro/OfferProducts"
import { products } from "../ProductFilter/ProFilter"
import './HobbyProduct.css'
import HobbyTitle from "./components/HobbyTitle"

const Sort = selectSort
const hobbyPro = products;

export default function HobbyProduct() {
    return (
        <div className="hobby-container">
            <HobbyTitle content={{ badge: 'Lưu giữ những sản phẩm dịu lành bạn yêu thích và mua sắm bất cứ khi nào bạn muốn', title: 'Sản phẩm ưu thích' }} />

            <div className="offer-bar">
                <div>{hobbyPro.length} sản phẩm đã lưu</div>
                <div className="offer-sort">
                    <span className="sort-label">Sắp xếp:</span>
                    <SelectSort content={Sort} />
                </div>
            </div>
            <ProductList
                products={hobbyPro}
            />
            <div className="bot-hobby">
                <span className="bot-content">Bạn đã xem {hobbyPro.length} sản phẩm yêu thích</span>
                <div>
                    <button className="btn-filter-reset">Tiếp tục mua sắm</button>
                </div>
            </div>
        </div >
    )
}