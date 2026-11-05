import HomeTitle from "../../components/HomeTitle"
import ProductList from "../../components/ProductList"
import { products } from "../ProductFilter/ProFilter"
import OptionOffering from "./components/OptionOffering"
import SelectSort from "../ProductFilter/components/Select"
import "./OfferProducts.css"

const offersProducts = products
const ListOption = [
    {
        id: 1,
        content: 'Tất cả ưu đãi'
    },
    {
        id: 2,
        content: 'Giảm từ 20%',
    },
    {
        id: 3,
        content: 'Dưới 150000 đ'
    }
]
const selectSort = [
    {
        id: 1,
        content: 'Phổ biến nhất'
    },
    {
        id: 2,
        content: 'Bán chạy nhất'
    },
    {
        id: 3,
        content: 'Sản phẩm mới'
    },
]

export default function OfferProducts() {
    return (
        <div className="offer-wrap">
            <HomeTitle content={{ badge: 'Diệu lành hơn, tiết kiệm hơn', title: 'Sản phẩm đang ưu đãi' }} />

            <div className="offer-bar">
                <OptionOffering items={ListOption} />
                <div className="offer-sort">
                    <span className="sort-label">Sắp xếp:</span>
                    <SelectSort content={selectSort} />
                </div>
            </div>
            <ProductList
                products={offersProducts}
            />
        </div>
    )
}