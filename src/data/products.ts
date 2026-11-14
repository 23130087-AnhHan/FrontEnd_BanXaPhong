export interface Product {
  id: number
  name: string
  price: number
  oldPrice?: number
  unit: string
  rating: number
  soldCount: string | number
  image: string
  category?: string
  inStock?: boolean
}

const image = 'https://img5.thuthuatphanmem.vn/uploads/2021/12/29/anh-trai-sau-rieng_042725668.jpg'

export const products: Product[] = [
  { id: 1, name: 'Xà phòng Oải hương hữu cơ', price: 180000, unit: 'bánh 100g', rating: 4.9, soldCount: '1.2k', image, inStock: true },
  { id: 2, name: 'Xà phòng Mật ong & Yến mạch', price: 165000, unit: 'bánh 100g', rating: 4.8, soldCount: '950', image, inStock: true },
  { id: 3, name: 'Xà phòng Trà xanh nguyên chất', price: 150000, unit: 'bánh 100g', rating: 5, soldCount: '1.5k', image, inStock: true },
  { id: 4, name: 'Xà phòng Cam Ngọt & Quế', price: 170000, unit: 'bánh 100g', rating: 4.9, soldCount: '820', image, inStock: false },
  { id: 5, name: 'Xà phòng Than tre & Bạc hà', price: 175000, unit: 'bánh 100g', rating: 4.8, soldCount: '340', image },
  { id: 6, name: 'Xà phòng Cà phê Quế tẩy tế bào chết', price: 160000, unit: 'bánh 100g', rating: 4.9, soldCount: '520', image },
  { id: 7, name: 'Xà phòng Hoa hồng & Đất sét', price: 155000, oldPrice: 190000, unit: 'bánh 100g', rating: 5, soldCount: '410', image },
  { id: 8, name: 'Xà phòng Gỗ Đàn Hương & Trầm', price: 185000, unit: 'bánh 100g', rating: 4.9, soldCount: '280', image },
]

export const bestSellers = products.slice(0, 4)
export const newProducts = products.slice(4)
export const mostView = [products[0], products[6], products[4], products[1]]
