interface Banner {
    id: number;
    image: string;
}
export default function Banner({ banner }: { banner: Banner }) {
    return (
        <div>
            <img src={banner.image} alt="" />
        </div>
    )
}