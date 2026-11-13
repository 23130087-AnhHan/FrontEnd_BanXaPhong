import { useSelector } from 'react-redux'
import ProductCard from './ProductCard'
import './ProductList.css'

export default function ProductList({ products }: { products: any[] }) {
    return (
        <div className="product-section">
            <div className="product-grid">
                {products.map((product: any) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}