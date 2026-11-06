import './Banner.css'

interface BannerProps {
    id: number;
    image: string;
}

export default function Banner({ banner }: { banner: BannerProps }) {
    return (
        <div className="banner-card">
            <div className="banner-text">
                <span className="banner-badge">Ưu đãi từ Saponi</span>
                <h2 className="banner-title">Chăm da dịu lành,<br />ưu đãi thêm xanh</h2>
                <p className="banner-desc">
                    Những bánh xà phòng thảo mộc bạn yêu, nay với mức giá dễ thương hơn.
                    Khám phá các sản phẩm đang ưu đãi đến 21%.
                </p>
                <p className="banner-note">Giá ưu đãi đã được áp dụng trực tiếp trên từng sản phẩm.</p>
            </div>
            <div className="banner-img">
                <img src={banner.image} alt="Sản phẩm ưu đãi" />
            </div>
        </div>
    )
}