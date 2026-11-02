import HomeTitle from "../../components/HomeTitle"
import ProductList from "../../components/ProductList"
import { products } from "../ProductFilter/ProFilter"


const offersProducts = products

export default function OfferProducts() {
    return (
        <div>
            <HomeTitle content={{ badge: 'Diệu lành hơn, tiết kiệm hơn', title: 'Sản phẩm đang ưu đãi' }} />
            <ProductList
                products={offersProducts}
            />
        </div>
    )
}