import HomeTitle from "../../components/HomeTitle"
import ProductList from "../../components/ProductList"
import { products } from '../../data/products'
import OptionOffering from "./components/OptionOffering"
import SelectSort from "../ProductFilter/components/Select"
import "./OfferProducts.css"
import Feature from "../Home/components/Feature"
import { faLeaf, faShieldHalved, faHandSparkles } from '@fortawesome/free-solid-svg-icons'
import Banner from "./components/Banner"
import bannerImg from '../../assets/img/offering.png'
import VoucherSection from "./components/VoucherSection"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../../store/store"
import { useEffect } from "react"
import { loadProducts } from "../../components/ProductSlice"


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
export const selectSort = [
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

const banner = [
    {
        id: 1,
        image: bannerImg
    }
]

const feature = [
    {
        id: 1,
        icon: faLeaf,
        content: '100% Tự nhiên'
    },
    {
        id: 2,
        icon: faShieldHalved,
        content: 'Không chất bảo quản'
    },
    {
        id: 3,
        icon: faHandSparkles,
        content: 'Chế tác thủ công'
    }
]

export default function OfferProducts() {
    const dispatch = useDispatch<AppDispatch>()
    const allProducts = useSelector((state: RootState) => state.products.items)


    const offersProducts = allProducts.filter(
        (p) => p.oldPrice != null && p.oldPrice > p.price
    )
    const displayProducts = offersProducts.length > 0 ? offersProducts : allProducts

    useEffect(() => {
        dispatch(loadProducts())
    }, [dispatch])

    return (
        <div className="offer-wrap">

            <div className="top">
                <Banner banner={banner[0]} />

                <Feature feature={feature} />

                <VoucherSection />
            </div>

            <HomeTitle content={{ badge: 'Diệu lành hơn, tiết kiệm hơn', title: 'Sản phẩm đang ưu đãi' }} />

            <div className="offer-bar">
                <OptionOffering items={ListOption} />
                <div className="offer-sort">
                    <span className="sort-label">Sắp xếp:</span>
                    <SelectSort content={selectSort} />
                </div>
            </div>
            <ProductList
                products={displayProducts}
            />
        </div>
    )
}
