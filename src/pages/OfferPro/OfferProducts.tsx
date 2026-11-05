import HomeTitle from "../../components/HomeTitle"
import ProductList from "../../components/ProductList"
import { products } from "../ProductFilter/ProFilter"
import OptionButton from "./components/OptionButton"

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

export default function OfferProducts() {
    return (
        <div>
            <div>

                <OptionButton items={ListOption} />
            </div>
            <HomeTitle content={{ badge: 'Diệu lành hơn, tiết kiệm hơn', title: 'Sản phẩm đang ưu đãi' }} />
            <ProductList
                products={offersProducts}
            />
        </div>
    )
}