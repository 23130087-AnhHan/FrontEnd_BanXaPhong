import HomeTitle from "../../components/HomeTitle"
import ProductList from "../../components/ProductList"
import { products } from "../ProductFilter/ProFilter"
import OptionOffering from "./components/OptionOffering"
import SelectSort from "../ProductFilter/components/Select"
import "./OfferProducts.css"
import Feature from "../Home/components/Feature"
import { faLeaf, faShieldHalved, faHandSparkles } from '@fortawesome/free-solid-svg-icons'
import Banner from "./components/Banner"
import bannerImg from '../../assets/img/offering.png'
import ProductCard from "../../components/ProductCard"

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
    return (
        <div className="offer-wrap">

            <div className="top">
                <Banner banner={banner[0]} />

                <Feature feature={feature} />
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
                products={offersProducts}
            />
        </div>
    )
}