import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../store/store'
import { loadProducts } from '../../components/ProductSlice'
import ProListFilter from "./components/ProListFilter";
import CheckboxFilter from "./components/CheckboxFilter";
import type { FilterItem } from "./components/CheckboxFilter";
import Title from "./components/Title";
import "./ProFilter.css";
import SelectSort from "./components/Select";
import Pagination from './components/Pagination';


const title1 = {
    id: 1, name: 'Danh mục'
};
const title2 = {
    id: 2, name: 'Thương hiệu'
};
const title3 = {
    id: 3, name: 'Khoảng giá'
};
const title4 = {
    id: 4, name: 'Đánh giá'
};

const defaultCategories: FilterItem[] = [];

const defaultBrandItems: FilterItem[] = [];

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
const ITEMS_PER_PAGE = 8

export default function ProFilter() {
    const dispatch = useDispatch<AppDispatch>()
    const products = useSelector((state: RootState) => state.products.items)
    const [brandItems, setBrandItems] = useState<FilterItem[]>(defaultBrandItems) 
    const [categories, setCategories] = useState<FilterItem[]>(defaultCategories)
    const [selectedCategoryIds, setSelectedCategoryIds] = useState<(string | number)[]>([])
    const [selectedBrandIds, setSelectedBrandIds] = useState<(string | number)[]>([])
    const [selectedPriceIds, setSelectedPriceIds] = useState<(string | number)[]>([])
    const [selectedRatingIds, setSelectedRatingIds] = useState<(string | number)[]>([])
    const [minPrice, setMinPrice] = useState('')
    const [maxPrice, setMaxPrice] = useState('')
    const [currentPage, setCurrentPage] = useState(1)

    const handleToggleCategory = (id: string | number) => {
        setSelectedCategoryIds((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        )
        setCurrentPage(1)
    }

    const handleToggleBrand = (id: string | number) => {
        setSelectedBrandIds((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        )
        setCurrentPage(1)
    }

    const handleTogglePrice = (id: string | number) => {
        setSelectedPriceIds((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        )
        setCurrentPage(1)
    }

    const handleToggleRating = (id: string | number) => {
        setSelectedRatingIds((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        )
        setCurrentPage(1)
    }

    const handleReset = () => {
        setSelectedCategoryIds([])
        setSelectedBrandIds([])
        setSelectedPriceIds([])
        setSelectedRatingIds([])
        setMinPrice('')
        setMaxPrice('')
        setCurrentPage(1)
    }
    const filteredProducts = products.filter((product) => {
        const matchesCategory = selectedCategoryIds.length === 0
            || (product.category != null && selectedCategoryIds.some((id) => String(id) === String(product.category)))
        const matchesBrand = selectedBrandIds.length === 0
            || (product.brandId != null && selectedBrandIds.some((id) => String(id) === String(product.brandId)))
        const matchesPricePreset = selectedPriceIds.length === 0 || selectedPriceIds.some((id) => {
            if (id === 10) return product.price < 150_000
            if (id === 11) return product.price >= 150_000 && product.price <= 180_000
            if (id === 12) return product.price > 180_000 && product.price <= 200_000
            if (id === 13) return product.price > 200_000
            return false
        })
        const matchesMinPrice = minPrice === '' || product.price >= Number(minPrice)
        const matchesMaxPrice = maxPrice === '' || product.price <= Number(maxPrice)
        const matchesRating = selectedRatingIds.length === 0 || selectedRatingIds.some((id) => {
            const rating = product.rating ?? 0
            if (id === 14) return rating === 5
            if (id === 15) return rating >= 4
            if (id === 16) return rating >= 3
            if (id === 17) return rating >= 2
            if (id === 18) return rating >= 1
            return false
        })
        return matchesCategory && matchesBrand && matchesPricePreset && matchesMinPrice && matchesMaxPrice && matchesRating
    })

    const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE))
    const safePage = Math.min(currentPage, totalPages)
    const paginatedProducts = filteredProducts.slice(
        (safePage - 1) * ITEMS_PER_PAGE,
        safePage * ITEMS_PER_PAGE
    )

    useEffect(() => {
        dispatch(loadProducts())

        fetch('http://localhost:3001/brands')
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setBrandItems(
                        data.map((b: { id: string; name: string }) => ({
                            id: b.id,
                            content: b.name,
                        }))
                    )
                }
            })
            .catch(() => {})

        fetch('http://localhost:3001/categories')
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setCategories(
                        data.slice(0, 5).map((b: { id: string; name: string }) => ({
                            id: b.id,
                            content: b.name,
                        }))
                    )
                }
            })
            .catch(() => {})
    }, [dispatch])

    return (
        <div className="pro-filter-container">
            <div className="filter-sidebar">
                <div className="filter-main-title">
                    <span>Bộ lọc tìm kiếm</span>
                </div>

                <div className="filter-section">
                    <Title title={title1} />
                    <CheckboxFilter
                        items={categories}
                        selectedIds={selectedCategoryIds}
                        onToggle={handleToggleCategory}
                    />
                </div>

                <div className="filter-section">
                    <Title title={title2} />
                    <CheckboxFilter
                        items={brandItems}
                        selectedIds={selectedBrandIds}
                        onToggle={handleToggleBrand}
                    />
                </div>

                <div className="filter-section">
                    <Title title={title3} />
                    <div className="price-inputs">
                        <input type="number" min="0" placeholder="Giá thấp nhất" value={minPrice} onChange={(event) => { setMinPrice(event.target.value); setCurrentPage(1) }} />
                        <span>-</span>
                        <input type="number" min="0" placeholder="Giá cao nhất" value={maxPrice} onChange={(event) => { setMaxPrice(event.target.value); setCurrentPage(1) }} />
                    </div>
                    <CheckboxFilter items={priceItems} selectedIds={selectedPriceIds} onToggle={handleTogglePrice} />
                </div>

                <div className="filter-section">
                    <Title title={title4} />
                    <CheckboxFilter items={ratingItems} selectedIds={selectedRatingIds} onToggle={handleToggleRating} />
                </div>

                <div className="filter-actions">
                    <button type="button" className="btn-filter-reset" onClick={handleReset}>Đặt lại</button>
                    {/* <button type="button" className="btn-filter-apply">Áp dụng</button> */}
                </div>
            </div>

            <div className="content-area">
                <div className="content-header">
                    <div className="select-feature">
                        <span className="select-label">Sắp xếp:</span>
                        <SelectSort content={selectSort} />
                    </div>
                </div>
                <ProListFilter products={paginatedProducts} />
                <Pagination
                    currentPage={safePage}
                    totalPages={totalPages}
                    onPageChange={(page) => {
                        setCurrentPage(page)
                    }}
                />
            </div>
        </div>
    );
}
