import { useSelector } from 'react-redux'
import type { RootState } from '../../store/store'
import SelectSort from "../ProductFilter/components/Select"
import ProductList from "../../components/ProductList"
import { selectSort } from "../OfferPro/OfferProducts"
import './HobbyProduct.css'
import HobbyTitle from "./components/HobbyTitle"

export default function HobbyProduct() {
    const products = useSelector((state: RootState) => state.wishlist.items)

    return (
        <div className="hobby-container">
            <HobbyTitle content={{ badge: 'Lưu giữ những sản phẩm dịu lành bạn yêu thích và mua sắm bất cứ khi nào bạn muốn', title: 'Sản phẩm ưu thích' }} />

            <div className="offer-bar">
                <div>{products.length} sản phẩm đã lưu</div>
                <div className="offer-sort">
                    <span className="sort-label">Sắp xếp:</span>
                    <SelectSort content={selectSort} />
                </div>
            </div>
            {products.length > 0 ? (
                <ProductList products={products} />
            ) : (
                <p className="empty-hobby">Bạn chưa có sản phẩm yêu thích nào.</p>
            )}
            <div className="bot-hobby">
                <span className="bot-content">Bạn đã xem {products.length} sản phẩm yêu thích</span>
                <div>
                    <button className="btn-filter-reset">Tiếp tục mua sắm</button>
                </div>
            </div>
        </div>
    )
}
