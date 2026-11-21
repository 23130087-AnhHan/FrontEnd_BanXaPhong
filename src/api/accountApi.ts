import { layNguoiDungHienTai } from './authApi'
import type { NguoiDung } from './authApi'

export interface Address {
  id: string
  userId: string
  receiverName: string
  receiverPhone: string
  province: string
  district: string
  ward: string
  detailAddress: string
  isDefault: boolean
  createdAt: string
}

export type Profile = Pick<NguoiDung, 'hoTen' | 'email' | 'phone' | 'birthday'>
const API_URL = 'http://localhost:3001'

export async function accountRequest<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(API_URL + path, options)
  if (!response.ok) throw new Error('Không thể tải hoặc lưu dữ liệu. Vui lòng thử lại.')
  return response.status === 204 ? undefined as T : response.json()
}

export function currentUserId() {
  const user = layNguoiDungHienTai()
  if (!user) throw new Error('Vui lòng đăng nhập để tiếp tục.')
  return user.id
}

export function accountFilter(field: string, value: string) {
  return '?_where=' + encodeURIComponent(JSON.stringify({ [field]: value }))
}

export function getProfile(): Promise<NguoiDung> {
  return accountRequest('/users/' + encodeURIComponent(currentUserId()))
}

export async function saveProfile(profile: Profile): Promise<NguoiDung> {
  const id = currentUserId()
  const users = await accountRequest<NguoiDung[]>('/users')
  if (users.some((user) => user.id !== id && user.email.toLowerCase() === profile.email.toLowerCase())) {
    throw new Error('Email này đã được sử dụng.')
  }
  return accountRequest('/users/' + encodeURIComponent(id), {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(profile),
  })
}

export async function changePassword(currentPassword: string, newPassword: string): Promise<void> {
  const user = await getProfile()
  if (user.matKhau !== currentPassword) throw new Error('Mật khẩu hiện tại không đúng.')
  if (currentPassword === newPassword) throw new Error('Mật khẩu mới phải khác mật khẩu hiện tại.')
  await accountRequest('/users/' + encodeURIComponent(user.id), {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ matKhau: newPassword }),
  })
}

export async function getAddresses(): Promise<Address[]> {
  const userId = currentUserId()
  const addresses = await accountRequest<Address[]>('/addresses' + accountFilter('userId', userId))
  return addresses.filter((address) => address.userId === userId)
}

export function formatAddress(address: Pick<Address, 'detailAddress' | 'ward' | 'district' | 'province'>) {
  return [address.detailAddress, address.ward, address.district, address.province].filter(Boolean).join(', ')
}
