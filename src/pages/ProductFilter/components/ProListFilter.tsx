import ProductCard from '../../../components/ProductCard'
import type { Product } from '../../../data/products'
import '../../../components/ProductList.css'


export default function ProListFilter({ products = [] }: { products: Product[] }) {
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
