import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight'
import { faEye } from '@fortawesome/free-solid-svg-icons/faEye'
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons/faEyeSlash'
import Icon from '../../../components/Icon'
import { dangKy } from '../../../api/authApi'
import './RegisterForm.css'

type LoiForm = {
    hoTen?: string
    email?: string
    matKhau?: string
    xacNhanMatKhau?: string
    dieuKhoan?: string
}

function kiemTraHopLe(hoTen: string, email: string, matKhau: string, xacNhanMatKhau: string, daChapNhanDieuKhoan: boolean): LoiForm {
    const loi: LoiForm = {}

    if (!hoTen.trim()) {
        loi.hoTen = 'Vui lòng nhập họ và tên'
    }

    const emailHopLe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    if (!email) {
        loi.email = 'Vui lòng nhập email'
    } else if (!emailHopLe) {
        loi.email = 'Email không đúng định dạng'
    }

    if (!matKhau) {
        loi.matKhau = 'Vui lòng nhập mật khẩu'
    } else if (matKhau.length < 8) {
        loi.matKhau = 'Mật khẩu tối thiểu 8 ký tự'
    } else if (!/[A-Z]/.test(matKhau) || !/[a-z]/.test(matKhau) || !/[0-9]/.test(matKhau)) {
        loi.matKhau = 'Mật khẩu phải có chữ hoa, chữ thường và số'
    }

    if (!xacNhanMatKhau) {
        loi.xacNhanMatKhau = 'Vui lòng xác nhận mật khẩu'
    } else if (xacNhanMatKhau !== matKhau) {
        loi.xacNhanMatKhau = 'Mật khẩu xác nhận không khớp'
    }

    if (!daChapNhanDieuKhoan) {
        loi.dieuKhoan = 'Bạn cần đồng ý với điều khoản để tiếp tục'
    }

    return loi
}

export default function RegisterForm() {
    const navigate = useNavigate()

    const [hoTen, setHoTen] = useState('')
    const [email, setEmail] = useState('')
    const [matKhau, setMatKhau] = useState('')
    const [xacNhanMatKhau, setXacNhanMatKhau] = useState('')
    const [daChapNhanDieuKhoan, setDaChapNhanDieuKhoan] = useState(false)

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const [loiForm, setLoiForm] = useState<LoiForm>({})
    const [loiMayChu, setLoiMayChu] = useState('')
    const [dangXuLy, setDangXuLy] = useState(false)

    async function xuLyDangKy(e: React.FormEvent) {
        e.preventDefault()

        const loiHienTai = kiemTraHopLe(hoTen, email, matKhau, xacNhanMatKhau, daChapNhanDieuKhoan)

        if (Object.keys(loiHienTai).length > 0) {
            setLoiForm(loiHienTai)
            return
        }

        setLoiForm({})
        setLoiMayChu('')
        setDangXuLy(true)

        try {
            const ketQua = await dangKy(hoTen.trim(), email.trim(), matKhau)

            if (!ketQua.thanhCong) {
                setLoiMayChu(ketQua.thongBaoLoi ?? 'Đăng ký thất bại')
                return
            }

            navigate('/login')
        } catch {
            setLoiMayChu('Không thể kết nối đến máy chủ, vui lòng thử lại')
        } finally {
            setDangXuLy(false)
        }
    }

    return (
        <section className="register-box" aria-labelledby="register-title">
            <h1 id="register-title" className="auth-title">Tạo tài khoản mới</h1>
            <p className="register-description">
                Cùng Saponi nâng niu làn da và đón nhận những ưu đãi dành riêng cho bạn.
            </p>

            <nav className="auth-tabs" aria-label="Tài khoản">
                <Link to="/login" className="auth-tab">Đăng nhập</Link>
                <button type="button" className="auth-tab active" aria-current="page">Đăng ký</button>
            </nav>

            <form className="register-form" onSubmit={xuLyDangKy} noValidate>
                <div className="register-field">
                    <label htmlFor="register-name">Họ và tên</label>
                    <input
                        id="register-name"
                        type="text"
                        autoComplete="name"
                        placeholder="Nhập họ và tên của bạn"
                        value={hoTen}
                        onChange={(e) => setHoTen(e.target.value)}
                        aria-invalid={!!loiForm.hoTen}
                        aria-describedby={loiForm.hoTen ? 'loi-ho-ten' : undefined}
                    />
                    {loiForm.hoTen && <p id="loi-ho-ten" className="register-error">{loiForm.hoTen}</p>}
                </div>

                <div className="register-field">
                    <label htmlFor="register-email">Địa chỉ email</label>
                    <input
                        id="register-email"
                        type="email"
                        autoComplete="email"
                        placeholder="Nhập địa chỉ email của bạn"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        aria-invalid={!!loiForm.email}
                        aria-describedby={loiForm.email ? 'loi-email' : undefined}
                    />
                    {loiForm.email && <p id="loi-email" className="register-error">{loiForm.email}</p>}
                </div>

                <div className="register-field">
                    <label htmlFor="register-password">Mật khẩu</label>
                    <div className="register-password">
                        <input
                            id="register-password"
                            type={showPassword ? 'text' : 'password'}
                            autoComplete="new-password"
                            placeholder="Tạo mật khẩu"
                            value={matKhau}
                            onChange={(e) => setMatKhau(e.target.value)}
                            aria-invalid={!!loiForm.matKhau}
                            aria-describedby="register-password-hint"
                        />
                        <button
                            type="button"
                            className="register-eye"
                            aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                            aria-controls="register-password"
                            onClick={() => setShowPassword((visible) => !visible)}
                        >
                            <Icon icon={showPassword ? faEyeSlash : faEye} />
                        </button>
                    </div>
                    {loiForm.matKhau
                        ? <p id="register-password-hint" className="register-error">{loiForm.matKhau}</p>
                        : <p id="register-password-hint" className="register-hint">Tối thiểu 8 ký tự, bao gồm chữ hoa, chữ thường và số.</p>
                    }
                </div>

                <div className="register-field">
                    <label htmlFor="register-confirm-password">Xác nhận mật khẩu</label>
                    <div className="register-password">
                        <input
                            id="register-confirm-password"
                            type={showConfirmPassword ? 'text' : 'password'}
                            autoComplete="new-password"
                            placeholder="Nhập lại mật khẩu"
                            value={xacNhanMatKhau}
                            onChange={(e) => setXacNhanMatKhau(e.target.value)}
                            aria-invalid={!!loiForm.xacNhanMatKhau}
                            aria-describedby={loiForm.xacNhanMatKhau ? 'loi-xac-nhan' : undefined}
                        />
                        <button
                            type="button"
                            className="register-eye"
                            aria-label={showConfirmPassword ? 'Ẩn mật khẩu xác nhận' : 'Hiện mật khẩu xác nhận'}
                            aria-controls="register-confirm-password"
                            onClick={() => setShowConfirmPassword((visible) => !visible)}
                        >
                            <Icon icon={showConfirmPassword ? faEyeSlash : faEye} />
                        </button>
                    </div>
                    {loiForm.xacNhanMatKhau && <p id="loi-xac-nhan" className="register-error">{loiForm.xacNhanMatKhau}</p>}
                </div>

                <div className="register-consent">
                    <input
                        id="register-terms"
                        type="checkbox"
                        checked={daChapNhanDieuKhoan}
                        onChange={(e) => setDaChapNhanDieuKhoan(e.target.checked)}
                        aria-describedby={loiForm.dieuKhoan ? 'loi-dieu-khoan' : undefined}
                    />
                    <label htmlFor="register-terms">
                        Tôi đồng ý với <a href="/terms">Điều khoản sử dụng</a> và{' '}
                        <a href="/privacy">Chính sách bảo mật</a> của Saponi.
                    </label>
                </div>
                {loiForm.dieuKhoan && <p id="loi-dieu-khoan" className="register-error">{loiForm.dieuKhoan}</p>}

                {loiMayChu && (
                    <p className="register-error register-error--server" role="alert">{loiMayChu}</p>
                )}

                <button type="submit" className="register-submit" disabled={dangXuLy}>
                    <span>{dangXuLy ? 'Đang xử lý...' : 'Tạo tài khoản'}</span>
                    {!dangXuLy && <Icon icon={faArrowRight} />}
                </button>
            </form>

            <p className="register-login-prompt">
                Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link>
            </p>
        </section>
    )
}
