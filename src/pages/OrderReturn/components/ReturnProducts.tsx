import { useState } from 'react'
import type { AccountOrder } from '../../../api/orderApi'
import ReturnItem from './ReturnItem'
import './ReturnProducts.css'

type ReturnProduct = AccountOrder['products'][number] & { selected: boolean; returnQuantity: number }

export default function ReturnProducts({ order }: { order: AccountOrder }) {
    const [items, setItems] = useState<ReturnProduct[]>(() => order.products.map((product) => ({
        ...product,
        selected: false,
        returnQuantity: 1,
    })))
    const selectedItems = items.filter((item) => item.selected)
    const selectedQuantity = selectedItems.reduce((sum, item) => sum + item.returnQuantity, 0)

    function toggleItem(id: string) {
        setItems((current) => current.map((item) => item.id === id ? { ...item, selected: !item.selected } : item))
    }

    function changeQuantity(id: string, delta: number) {
        setItems((current) => current.map((item) => item.id === id
            ? { ...item, returnQuantity: Math.max(1, Math.min(item.quantity, item.returnQuantity + delta)) }
            : item))
    }

    return (
        <div className="return-box">
            <h2>Sản phẩm muốn trả</h2>
            <p className="return-subtitle">Chọn sản phẩm và số lượng trong đơn hàng đã giao.</p>

            <div className="return-list">
                {items.map((item) => (
                    <ReturnItem
                        key={item.id}
                        item={{ ...item, desc: `${item.weight || 'Sản phẩm'} · Đã mua: ${item.quantity} · ${item.price} / sản phẩm`, price: item.price }}
                        onToggle={() => toggleItem(item.id)}
                        onQuantityChange={(delta) => changeQuantity(item.id, delta)}
                    />
                ))}
                {items.length === 0 && <p>Đơn hàng này không có sản phẩm để trả.</p>}
            </div>

            <p className="return-total">Đã chọn {selectedItems.length} sản phẩm - Tổng số lượng trả: {selectedQuantity}</p>
        </div>
    )
}
