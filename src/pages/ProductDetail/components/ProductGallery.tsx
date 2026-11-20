import { useState } from 'react'
import type { ProductImageData } from '../../../api/productApi'
import './ProductGallery.css'

interface Props {
  images: ProductImageData[]
  productName: string
}

export default function ProductGallery({ images, productName }: Props) {
  const [selected, setSelected] = useState(0)

  if (images.length === 0) {
    return (
      <section className="product-gallery" aria-label="Hình ảnh sản phẩm">
        <div className="product-gallery-main">
          <img src="https://images.unsplash.com/photo-1607006314644-8cbdf6a94f6c?auto=format&fit=crop&w=600&q=80" alt={productName} />
        </div>
      </section>
    )
  }

  return (
    <section className="product-gallery" aria-label="Hình ảnh sản phẩm">
      <div className="product-gallery-main">
        <img src={images[selected].imageUrl} alt={productName} />
      </div>
      <div className="product-gallery-thumbnails">
        {images.map((img, idx) => (
          <button
            key={img.id}
            type="button"
            className={'product-gallery-thumbnail' + (selected === idx ? ' active' : '')}
            aria-label={`Xem hình ${idx + 1}`}
            aria-pressed={selected === idx}
            onClick={() => setSelected(idx)}
          >
            <img src={img.imageUrl} alt="" />
          </button>
        ))}
      </div>
    </section>
  )
}
