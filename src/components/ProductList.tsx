import ProductCard, { type Product } from './ProductCard'
import './ProductList.css'

export default function ProductList({ products = [] }: { products?: Product[] }) {
    return (
        <div className="product-section">
            <div className="product-grid">
                {(products || []).filter(Boolean).map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}
