import type { Product } from '../data/products'
import ProductCard from './ProductCard'
import './ProductList.css'

export default function ProductList({ products }: { products: Product[] }) {
    return (
        <div className="product-section">
            <div className="product-grid">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}