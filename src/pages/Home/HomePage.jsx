import ProductList from '../../components/ProductList'
import Banner from './components/Banner'
import bannerImg from '../../assets/img/banner.png'
import '../../styles/HomePage.css'

const banner = [
    {
        id: 1,
        image: bannerImg
    }
]

const bestSellers = [
    {
        id: 1,
        name: 'Xà phòng Oải hương hữu cơ',
        category: 'Xà phòng',
        price: 180000,
        unit: 'bánh 100g',
        rating: 4.9,
        soldCount: '1.2k',
        image: 'https://img5.thuthuatphanmem.vn/uploads/2021/12/29/anh-trai-sau-rieng_042725668.jpg',
        inStock: true,
    },
    {
        id: 2,
        name: 'Xà phòng Mật ong & Yến mạch',
        category: 'Xà phòng',
        price: 165000,
        unit: 'bánh 100g',
        rating: 4.8,
        soldCount: '950',
        image: 'https://img5.thuthuatphanmem.vn/uploads/2021/12/29/anh-trai-sau-rieng_042725668.jpg',
        inStock: true,
    },
    {
        id: 3,
        name: 'Xà phòng Trà xanh nguyên chất',
        category: 'Xà phòng',
        price: 150000,
        unit: 'bánh 100g',
        rating: 5.0,
        soldCount: '1.5k',
        image: 'https://img5.thuthuatphanmem.vn/uploads/2021/12/29/anh-trai-sau-rieng_042725668.jpg',
        inStock: true,
    },
    {
        id: 4,
        name: 'Xà phòng Cam Ngọt & Quế',
        category: 'Xà phòng',
        price: 170000,
        unit: 'bánh 100g',
        rating: 4.9,
        soldCount: '820',
        image: 'https://img5.thuthuatphanmem.vn/uploads/2021/12/29/anh-trai-sau-rieng_042725668.jpg',
        inStock: false,
    }
];

const newProducts = [
    {
        id: 5,
        name: 'Xà phòng Than tre & Bạc hà',
        price: 175000,
        unit: 'bánh 100g',
        rating: 4.8,
        soldCount: '340',
        image: 'https://img5.thuthuatphanmem.vn/uploads/2021/12/29/anh-trai-sau-rieng_042725668.jpg',
    },
    {
        id: 6,
        name: 'Xà phòng Cà phê Quế tẩy tế b...',
        price: 160000,
        unit: 'bánh 100g',
        rating: 4.9,
        soldCount: '520',
        image: 'https://img5.thuthuatphanmem.vn/uploads/2021/12/29/anh-trai-sau-rieng_042725668.jpg',
    },
    {
        id: 7,
        name: 'Xà phòng Hoa hồng & Đất sét...',
        price: 195000,
        unit: 'bánh 100g',
        rating: 5.0,
        soldCount: '410',
        image: 'https://img5.thuthuatphanmem.vn/uploads/2021/12/29/anh-trai-sau-rieng_042725668.jpg',
    },
    {
        id: 8,
        name: 'Xà phòng Gỗ Đàn Hương & Tr...',
        price: 185000,
        unit: 'bánh 100g',
        rating: 4.9,
        soldCount: '280',
        image: 'https://img5.thuthuatphanmem.vn/uploads/2021/12/29/anh-trai-sau-rieng_042725668.jpg',
    }
];

const mostView = [
    {
        id: 1,
        name: 'Xà phòng Oải hương hữu cơ',
        price: 185000,
        unit: 'bánh 100g',
        rating: 4.9,
        soldCount: '1.2k',
        image: 'https://img5.thuthuatphanmem.vn/uploads/2021/12/29/anh-trai-sau-rieng_042725668.jpg',
    },
    {
        id: 2,
        name: 'Xà phòng Đất sét hoa hồng',
        price: 195000,
        unit: 'bánh 100g',
        rating: 5.0,
        soldCount: '2.4k',
        image: 'https://img5.thuthuatphanmem.vn/uploads/2021/12/29/anh-trai-sau-rieng_042725668.jpg',
    },
    {
        id: 3,
        name: 'Xà phòng Bạc hà than tre',
        price: 175000,
        unit: 'bánh 100g',
        rating: 4.8,
        soldCount: '890',
        image: 'https://img5.thuthuatphanmem.vn/uploads/2021/12/29/anh-trai-sau-rieng_042725668.jpg',
    },
    {
        id: 4,
        name: 'Xà phòng Mật Ong Rừng & Yến',
        price: 165000,
        unit: 'bánh 100g',
        rating: 4.9,
        soldCount: '1.1k',
        image: 'https://img5.thuthuatphanmem.vn/uploads/2021/12/29/anh-trai-sau-rieng_042725668.jpg',
    }
];

export default function HomePage() {
    return (
        <div className="product-list">
            <Banner
                banner={banner[0]}
            />

            <ProductList
                content={{ badge: 'BÁN CHẠY', title: 'Top sản phẩm bán chạy nhất' }}
                products={bestSellers}
            />
            <ProductList
                content={{ badge: 'MỚI RA MẮT', title: 'Top sản phẩm mới nhất' }}
                products={newProducts}
            />
            <ProductList
                content={{ badge: 'ĐƯỢC XEM NHIỀU', title: 'Top sản phẩm được được xem nhiều nhất' }}
                products={mostView}
            />
        </div>
    )
}