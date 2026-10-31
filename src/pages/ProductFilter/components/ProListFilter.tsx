import ProductCard from '../../../components/ProductCard'
import '../../../components/ProductList.css'


export default function ProListFilter({ products = [] }: { products: any[] }) {
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