import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../store/store'
import { loadProducts } from '../../components/ProductSlice'
import SelectSort from "../ProductFilter/components/Select"
import ProductList from "../../components/ProductList"
import { selectSort } from "../OfferPro/OfferProducts"
import './HobbyProduct.css'
import HobbyTitle from "./components/HobbyTitle"

export default function HobbyProduct() {
    const dispatch = useDispatch<AppDispatch>()
    const products = useSelector((state: RootState) => state.products.items).slice(0,6)

    useEffect(() => {
        dispatch(loadProducts())
    }, [dispatch])

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
            <ProductList
                products={products}
                defaultHobby
            />
            <div className="bot-hobby">
                <span className="bot-content">Bạn đã xem {products.length} sản phẩm yêu thích</span>
                <div>
                    <button className="btn-filter-reset">Tiếp tục mua sắm</button>
                </div>
            </div>
        </div>
    )
}
