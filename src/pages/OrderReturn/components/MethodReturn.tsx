import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faChevronDown, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import './MethodReturn.scss'

export default function MethodReturn() {
    return (
        <>
            <div className="method-box">
                <h2>Phương thức nhận hoàn tiền</h2>
                <p className="subtitle">Đơn hàng đã thanh toán khi nhận hàng (COD).</p>

                <div className="method-option">
                    <div className="radio-dot" />
                    <span>Chuyển khoản ngân hàng</span>
                </div>

                <div className="field">
                    <label htmlFor="bank-select">Ngân hàng *</label>
                    <div className="select-wrap">
                        <select id="bank-select" defaultValue="">
                            <option value="" disabled>Chọn ngân hàng</option>
                            <option value="vcb">Vietcombank</option>
                            <option value="tcb">Techcombank</option>
                        </select>
                        <FontAwesomeIcon icon={faChevronDown} className="arrow" />
                    </div>
                </div>

                <div className="grid-2">
                    <div className="field">
                        <label htmlFor="acc-number">Số tài khoản *</label>
                        <input id="acc-number" type="text" placeholder="Nhập số tài khoản" />
                    </div>

                    <div className="field">
                        <label htmlFor="acc-name">Tên chủ tài khoản *</label>
                        <input id="acc-name" type="text" placeholder="Họ tên không dấu" />
                    </div>
                </div>

                <div className="contact-footer">
                    <div className="contact-row">
                        <span>Liên hệ về yêu cầu</span>
                        <strong>Trần Bảo Hoàng · 0983 234 567</strong>
                    </div>
                    <p>Kiểm tra chính xác tài khoản nhận tiền. Không cung cấp mật khẩu, mã PIN hoặc OTP.</p>
                </div>
            </div >


        </>
    )
}
