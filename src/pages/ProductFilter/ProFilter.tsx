import ProListFilter from "./components/ProListFilter";
import CheckboxFilter from "./components/CheckboxFilter";
import Title from "./components/Title";
import "./ProFilter.css";
import SelectSort from "./components/Select";

export default function ProFilter() {

    const title1 = {
        id: 1, name: 'Danh mục'
    };
    const title2 = {
        id: 2, name: 'Loại da'
    };
    const title3 = {
        id: 3, name: 'Khoảng giá'
    };
    const title4 = {
        id: 4, name: 'Đánh giá'
    };

    const categoryItems = [
        { id: 1, content: 'Xà phòng tắm thảo mộc' },
        { id: 2, content: 'Xà phòng rửa mặt dưỡng ẩm' },
        { id: 3, content: 'Xà phòng tẩy tế bào chết' },
        { id: 4, content: 'Bánh gội đầu thảo dược' },
        { id: 5, content: 'Xà phòng cho da nhạy cảm' },
    ];

    const skinTypeItems = [
        { id: 6, content: 'Da thường' },
        { id: 7, content: 'Da khô' },
        { id: 8, content: 'Da dầu & Mụn' },
        { id: 9, content: 'Da nhạy cảm' },
    ];

    const priceItems = [
        { id: 10, content: 'Dưới 150.000 đ' },
        { id: 11, content: '150.000 đ - 180.000 đ' },
        { id: 12, content: '180.000 đ - 200.000 đ' },
        { id: 13, content: 'Trên 200.000 đ' },
    ];

    const ratingItems = [
        { id: 14, content: '5 sao' },
        { id: 15, content: 'Từ 4 sao' },
        { id: 16, content: 'Từ 3 sao' },
        { id: 17, content: 'Từ 2 sao' },
        { id: 18, content: 'Từ 1 sao' },
    ];

    const products = [
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
        },
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
        },
        {
            id: 9,
            name: 'Xà phòng Oải hương hữu cơ',
            price: 185000,
            unit: 'bánh 100g',
            rating: 4.9,
            soldCount: '1.2k',
            image: 'https://img5.thuthuatphanmem.vn/uploads/2021/12/29/anh-trai-sau-rieng_042725668.jpg',
        },
        {
            id: 10,
            name: 'Xà phòng Đất sét hoa hồng',
            price: 195000,
            unit: 'bánh 100g',
            rating: 5.0,
            soldCount: '2.4k',
            image: 'https://img5.thuthuatphanmem.vn/uploads/2021/12/29/anh-trai-sau-rieng_042725668.jpg',
        },
        {
            id: 11,
            name: 'Xà phòng Bạc hà than tre',
            price: 175000,
            unit: 'bánh 100g',
            rating: 4.8,
            soldCount: '890',
            image: 'https://img5.thuthuatphanmem.vn/uploads/2021/12/29/anh-trai-sau-rieng_042725668.jpg',
        },
        {
            id: 12,
            name: 'Xà phòng Mật Ong Rừng & Yến',
            price: 165000,
            unit: 'bánh 100g',
            rating: 4.9,
            soldCount: '1.1k',
            image: 'https://img5.thuthuatphanmem.vn/uploads/2021/12/29/anh-trai-sau-rieng_042725668.jpg',
        }
    ];
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
    return (
        <div className="pro-filter-container">
            <div className="filter-sidebar">
                <div className="filter-main-title">
                    <span>Bộ lọc tìm kiếm</span>
                </div>

                <div className="filter-section">
                    <Title title={title1} />
                    <CheckboxFilter items={categoryItems} />
                </div>

                <div className="filter-section">
                    <Title title={title2} />
                    <CheckboxFilter items={skinTypeItems} />
                </div>

                <div className="filter-section">
                    <Title title={title3} />
                    <div className="price-inputs">
                        <input type="number" placeholder="120000" defaultValue="120000" />
                        <span>-</span>
                        <input type="number" placeholder="250000" defaultValue="250000" />
                    </div>
                    <CheckboxFilter items={priceItems} />
                </div>

                <div className="filter-section">
                    <Title title={title4} />
                    <CheckboxFilter items={ratingItems} />
                </div>

                <div className="filter-actions">
                    <button type="button" className="btn-filter-reset">Đặt lại</button>
                    <button type="button" className="btn-filter-apply">Áp dụng</button>
                </div>
            </div>

            <div className="product-content-area">
                <div className="product-content-header">
                    <div className="select-feature">
                        <span className="select-label">Sắp xếp:</span>
                        <SelectSort content={selectSort} />
                    </div>
                </div>
                <ProListFilter products={products} />
            </div>
        </div>
    );
}