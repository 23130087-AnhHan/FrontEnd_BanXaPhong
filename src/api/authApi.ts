const API_URL = 'http://localhost:3001'

export type NguoiDung = {
    id: string
    hoTen: string
    email: string
    matKhau: string
}

export type KetQuaDangNhap = {
    thanhCong: boolean
    nguoiDung?: Omit<NguoiDung, 'matKhau'>
    thongBaoLoi?: string
}

export type KetQuaDangKy = {
    thanhCong: boolean
    thongBaoLoi?: string
}

export async function dangNhap(email: string, matKhau: string): Promise<KetQuaDangNhap> {
    const response = await fetch(`${API_URL}/users?email=${encodeURIComponent(email)}`)

    if (!response.ok) {
        return { thanhCong: false, thongBaoLoi: 'Không thể kết nối đến máy chủ' }
    }

    const danhSachNguoiDung: NguoiDung[] = await response.json()
    const nguoiDungTimThay = danhSachNguoiDung.find((u) => u.matKhau === matKhau)

    if (!nguoiDungTimThay) {
        return { thanhCong: false, thongBaoLoi: 'Email hoặc mật khẩu không đúng' }
    }

    const thongTinNguoiDung = {
        id: nguoiDungTimThay.id,
        hoTen: nguoiDungTimThay.hoTen,
        email: nguoiDungTimThay.email
    }

    return { thanhCong: true, nguoiDung: thongTinNguoiDung }
}

export async function kiemTraEmailDaTonTai(email: string): Promise<boolean> {
    const response = await fetch(`${API_URL}/users?email=${encodeURIComponent(email)}`)
    const danhSach: NguoiDung[] = await response.json()
    return danhSach.length > 0
}

export async function dangKy(hoTen: string, email: string, matKhau: string): Promise<KetQuaDangKy> {
    const emailDaTonTai = await kiemTraEmailDaTonTai(email)

    if (emailDaTonTai) {
        return { thanhCong: false, thongBaoLoi: 'Email này đã được sử dụng' }
    }

    const nguoiDungMoi: Omit<NguoiDung, 'id'> = { hoTen, email, matKhau }

    const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nguoiDungMoi),
    })

    if (!response.ok) {
        return { thanhCong: false, thongBaoLoi: 'Đăng ký thất bại, vui lòng thử lại' }
    }

    return { thanhCong: true }
}
