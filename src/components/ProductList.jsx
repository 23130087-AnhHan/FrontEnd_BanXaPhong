import HomeTitle from './HomeTitle'
import ProductCard from './ProductCard'
import './ProductList.css'

export default function ProductList({ content, products = [] }) {
    return (
        <div className="product-section">
            <HomeTitle content={content} />
            <div className="product-grid">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}