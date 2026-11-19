import { useState } from 'react'
import './VoucherSection.css'

interface Voucher {
    id: number
    tag: string
    title: string
    description: string
    code: string
}

const vouchers: Voucher[] = [
    {
        id: 1,
        tag: 'GIẢM CHO ĐƠN ĐẦU',
        title: 'Giảm 10%',
        description: 'Đơn từ 199.000đ · Tối đa 30.000đ',
        code: 'SAPONI10',
    },
    {
        id: 2,
        tag: 'ƯU ĐÃI MUA SẮM',
        title: 'Giảm 30.000đ',
        description: 'Áp dụng cho đơn từ 399.000đ',
        code: 'XANH30K',
    },
    {
        id: 3,
        tag: 'GIAO HÀNG TIẾT KIỆM',
        title: 'Miễn phí vận chuyển',
        description: 'Đơn từ 299.000đ · Tối đa 25.000đ',
        code: 'FREESHIP',
    },
]

export default function VoucherSection() {
    const [copied, setCopied] = useState<number | null>(null)

    const handleCopy = (voucher: Voucher) => {
        navigator.clipboard.writeText(voucher.code)
        setCopied(voucher.id)
        setTimeout(() => setCopied(null), 2000)
    }

    return (
        <div className="voucher-section">
            <div className="voucher-header">
                <h2 className="voucher-title">Nhận mã ưu đãi</h2>
                <p className="voucher-subtitle">Chọn voucher yêu thích và nhận mã trước khi mua sắm.</p>
            </div>
            <div className="voucher-list">
                {vouchers.map((voucher) => (
                    <div className="voucher-card" key={voucher.id}>
                        <span className="voucher-tag">{voucher.tag}</span>
                        <p className="voucher-name">{voucher.title}</p>
                        <p className="voucher-desc">{voucher.description}</p>
                        <div className="voucher-footer">
                            <span className="voucher-code">{voucher.code}</span>
                            <button
                                className={`voucher-btn${copied === voucher.id ? ' copied' : ''}`}
                                onClick={() => handleCopy(voucher)}
                            >
                                {copied === voucher.id ? 'Đã lưu!' : 'Nhận mã'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

