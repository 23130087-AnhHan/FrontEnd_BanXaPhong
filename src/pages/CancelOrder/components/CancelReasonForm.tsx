import { useState, type FormEvent } from 'react'
import './CancelReasonForm.css'

const cancelReasons = [
  { id: 'change-products', label: 'Tôi muốn thay đổi sản phẩm hoặc số lượng' },
  { id: 'change-address', label: 'Tôi muốn thay đổi địa chỉ nhận hàng' },
  { id: 'change-payment', label: 'Tôi muốn thay đổi phương thức thanh toán' },
  { id: 'duplicate-order', label: 'Tôi đã đặt trùng đơn hàng' },
  { id: 'no-longer-needed', label: 'Tôi không còn nhu cầu mua' },
  { id: 'other', label: 'Lý do khác' },
]

interface CancelReasonFormProps {
  onConfirm?: () => void
}

export default function CancelReasonForm({ onConfirm }: CancelReasonFormProps) {
  const [selectedReason, setSelectedReason] = useState('')
  const [note, setNote] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onConfirm?.()
  }

  return (
    <section
      className="cancel-order-panel cancel-reasons"
      aria-labelledby="cancel-reasons-title"
    >
      <div className="cancel-reasons-heading">
        <h2 id="cancel-reasons-title">Vì sao bạn muốn huỷ đơn?</h2>
        <p>Chọn một lý do. Phản hồi của bạn giúp chúng tôi phục vụ tốt hơn.</p>
      </div>

      <form
        id="cancel-order-form"
        className="cancel-reasons-form"
        onSubmit={handleSubmit}
      >
        <fieldset className="cancel-reasons-list" aria-labelledby="cancel-reasons-title">
          {cancelReasons.map((reason) => (
            <label
              key={reason.id}
              className={
                'cancel-reason-option' + (selectedReason === reason.id ? ' active' : '')
              }
            >
              <input
                type="radio"
                name="cancelReason"
                value={reason.id}
                checked={selectedReason === reason.id}
                onChange={() => setSelectedReason(reason.id)}
                required
              />
              <span>{reason.label}</span>
            </label>
          ))}
        </fieldset>

        <div className="cancel-reason-note">
          <label htmlFor="cancel-order-note">
            Lý do khác / Ghi chú{' '}
            {selectedReason === 'other' && (
              <span aria-hidden="true">*</span>
            )}
          </label>
          <textarea
            id="cancel-order-note"
            name="note"
            rows={4}
            maxLength={500}
            value={note}
            onChange={(event) => setNote(event.target.value)}
            placeholder="Ví dụ: Tôi muốn đổi sang bộ quà tặng để tặng người thân."
            required={selectedReason === 'other'}
            aria-describedby="cancel-order-note-hint"
          />
          <div className="cancel-reason-hint">
            <p id="cancel-order-note-hint">
              Vui lòng nêu rõ lý do khi chọn &quot;Lý do khác&quot; (tối đa 500 ký tự).
            </p>
            <span>{note.length}/500</span>
          </div>
        </div>
      </form>
    </section>
  )
}
