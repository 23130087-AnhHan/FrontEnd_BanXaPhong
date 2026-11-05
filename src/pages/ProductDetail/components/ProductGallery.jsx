import { useState } from 'react'
import './ProductGallery.css'

const productImages = [
  { id: 1, image: 'https://img5.thuthuatphanmem.vn/uploads/2021/12/29/anh-trai-sau-rieng_042725668.jpg', label: 'Ảnh sản phẩm 1' },
  { id: 2, image: 'https://img5.thuthuatphanmem.vn/uploads/2021/12/29/anh-trai-sau-rieng_042725668.jpg', label: 'Ảnh sản phẩm 2' },
  { id: 3, image: 'https://img5.thuthuatphanmem.vn/uploads/2021/12/29/anh-trai-sau-rieng_042725668.jpg', label: 'Ảnh sản phẩm 3' },
  { id: 4, image: 'https://img5.thuthuatphanmem.vn/uploads/2021/12/29/anh-trai-sau-rieng_042725668.jpg', label: 'Ảnh sản phẩm 4' },
]

export default function ProductGallery() {
  const [selectedImage, setSelectedImage] = useState(productImages[0])

  return (
    <section className="product-gallery" aria-label="Hình ảnh sản phẩm">
      <div className="product-gallery-main">
        <img src={selectedImage.image} alt={selectedImage.label} />
      </div>
      <div className="product-gallery-thumbnails">
        {productImages.map((productImage) => (
          <button
            key={productImage.id}
            type="button"
            className={'product-gallery-thumbnail' + (selectedImage.id === productImage.id ? ' active' : '')}
            aria-label={'Xem ' + productImage.label.toLowerCase()}
            aria-pressed={selectedImage.id === productImage.id}
            onClick={() => setSelectedImage(productImage)}
          >
            <img src={productImage.image} alt="" />
          </button>
        ))}
      </div>
    </section>
  )
}
