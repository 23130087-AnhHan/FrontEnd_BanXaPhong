import ProductCard from '../components/ProductCard'
import '../styles/HomePage.css'
export default function HomePage() {
    return (
        <div class='product-list'>
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
        </div>
    )
}