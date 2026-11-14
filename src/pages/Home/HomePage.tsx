import { useSelector } from 'react-redux'
import ProductList from '../../components/ProductList'
import HomeTitle from '../../components/HomeTitle'
import Banner from './components/Banner'
import bannerImg from '../../assets/img/banner.png'
import { faLeaf, faShieldHalved, faHandSparkles } from '@fortawesome/free-solid-svg-icons'
import '../../styles/HomePage.css'
import Feature from './components/Feature'

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

export default function HomePage() {
    const bestSellers = useSelector((state: any) => state.products.bestSellers)
    const newProducts = useSelector((state: any) => state.products.newProducts)
    const mostView = useSelector((state: any) => state.products.mostView)


    return (
        <div className="product-list">
            <Banner
                banner={banner[0]}
            />

            <Feature
                feature={feature}
            />

            <HomeTitle content={{ badge: 'BÁN CHẠY', title: 'Top sản phẩm bán chạy nhất' }} />
            <ProductList products={bestSellers} />

            <HomeTitle content={{ badge: 'MỚI RA MẮT', title: 'Top sản phẩm mới nhất' }} />
            <ProductList products={newProducts} />

            <HomeTitle content={{ badge: 'ĐƯỢC XEM NHIỀU', title: 'Top sản phẩm được được xem nhiều nhất' }} />
            <ProductList products={mostView} />
        </div>
    )
}