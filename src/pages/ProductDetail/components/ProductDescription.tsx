import { faHandSparkles, faLeaf, faShieldHalved } from '@fortawesome/free-solid-svg-icons'
import Icon from '../../../components/Icon'
import './ProductDescription.css'

export default function ProductDescription() {
  return (
    <section className="product-detail-panel product-description" aria-labelledby="product-description-title">
      <h2 id="product-description-title">Mô tả sản phẩm</h2>
      <div className="product-description-content">
        <p>
          Xà phòng Oải hương Pháp Saponi là sự kết tinh của tinh dầu <strong>hoa oải hương Provence</strong> tự nhiên
          và công thức thủ công, giúp giữ nguyên dưỡng chất từ các loại dầu thực vật.
          Hương thơm dịu nhẹ mang đến cảm giác thư thái sau một ngày dài.
        </p>
        <p>
          Với dầu olive, dầu dừa và bơ hạt mỡ, từng bánh xà phòng được tạo nên từ những nguyên liệu chọn lọc.
          Lớp bọt mềm mịn nhẹ nhàng làm sạch, giúp làn da luôn mềm mại và lưu lại hương hoa oải hương thanh khiết.
        </p>
        <p>
          <strong>Hướng dẫn sử dụng:</strong> Làm ướt da và bánh xà phòng, tạo bọt trong lòng bàn tay hoặc với bông tắm.
          Massage nhẹ nhàng lên da rồi rửa sạch với nước.
        </p>
        <p>
          <strong>Bảo quản:</strong> Để ở nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp.
          Đặt trên khay có rãnh thoát nước sau mỗi lần sử dụng để bánh xà phòng được bền lâu hơn.
        </p>
      </div>
      <div className="product-description-benefits">
        <span><Icon icon={faLeaf} /> 100% thành phần tự nhiên</span>
        <span><Icon icon={faShieldHalved} /> An toàn, dịu nhẹ</span>
        <span><Icon icon={faHandSparkles} /> Thủ công cho mọi làn da</span>
      </div>
    </section>
  )
}
