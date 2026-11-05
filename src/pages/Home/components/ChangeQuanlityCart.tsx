import { useState } from "react";

export default function ChangeQuanlityCart() {
    const [qualityCart, setQualityCart] = useState(1)
    const addToCart = () => {
        setQualityCart(qualityCart + 1)
    }
    return (
        <div>

        </div>
    )
}