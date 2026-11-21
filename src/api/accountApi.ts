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
export type AddressInput = Omit<Address, 'id' | 'userId' | 'createdAt'>
const API_URL = 'http://localhost:3001'

export async function accountRequest<T>(path: string, options?: RequestInit): Promise<T> {
  let response: Response
  try { response = await fetch(API_URL + path, options) }
  catch { throw new Error('Không thể kết nối máy chủ. Vui lòng thử lại.') }
  if (!response.ok) throw new Error('Không thể tải hoặc lưu dữ liệu. Vui lòng thử lại.')
  return response.status === 204 ? undefined as T : response.json()
}

export function currentUserId() {
  const user = layNguoiDungHienTai()
  if (!user) throw new Error('Vui lòng đăng nhập để tiếp tục.')
  return user.id
}

export function accountFilter(field: string, value: string | string[]) {
  return '?_where=' + encodeURIComponent(JSON.stringify({ [field]: Array.isArray(value) ? { in: value } : { eq: value } }))
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

export async function getAddress(id: string): Promise<Address> {
  const address = await accountRequest<Address>('/addresses/' + encodeURIComponent(id))
  if (address.userId !== currentUserId()) throw new Error('Không tìm thấy địa chỉ của bạn.')
  return address
}

function patchAddress(id: string, data: Partial<AddressInput>): Promise<Address> {
  return accountRequest('/addresses/' + encodeURIComponent(id), {
    method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data),
  })
}

export async function setDefaultAddress(id: string): Promise<void> {
  const addresses = await getAddresses()
  const target = addresses.find((address) => address.id === id)
  if (!target) throw new Error('Không tìm thấy địa chỉ của bạn.')
  const changed: Address[] = []
  try {
    for (const address of [target, ...addresses.filter((item) => item.id !== id && item.isDefault)]) {
      if (address.isDefault === (address.id === id)) continue
      await patchAddress(address.id, { isDefault: address.id === id })
      changed.push(address)
    }
  } catch (error) {
    await Promise.allSettled(changed.map((address) => patchAddress(address.id, { isDefault: address.isDefault })))
    throw error
  }
}

export async function saveAddress(data: AddressInput, id?: string): Promise<Address> {
  const userId = currentUserId()
  const addresses = await getAddresses()
  if (currentUserId() !== userId) throw new Error('Tài khoản đã thay đổi. Vui lòng tải lại trang.')
  const previous = id ? addresses.find((address) => address.id === id) : undefined
  if (id && !previous) throw new Error('Không tìm thấy địa chỉ của bạn.')
  const saved = await accountRequest<Address>('/addresses' + (id ? '/' + encodeURIComponent(id) : ''), {
    method: id ? 'PATCH' : 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...data, isDefault: previous?.isDefault ?? false, userId, ...(!id && { createdAt: new Date().toISOString() }) }),
  })
  try {
    if (data.isDefault || addresses.length === 0) await setDefaultAddress(saved.id)
    return saved
  } catch (error) {
    await accountRequest('/addresses/' + encodeURIComponent(saved.id), previous ? {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(previous),
    } : { method: 'DELETE' }).catch(() => {})
    throw error
  }
}

export async function deleteAddress(id: string): Promise<void> {
  const addresses = await getAddresses()
  const target = addresses.find((address) => address.id === id)
  if (!target) throw new Error('Không tìm thấy địa chỉ của bạn.')
  const replacement = addresses.find((address) => address.id !== id)
  if (target.isDefault && replacement) await setDefaultAddress(replacement.id)
  try {
    await accountRequest('/addresses/' + encodeURIComponent(id), { method: 'DELETE' })
  } catch (error) {
    if (target.isDefault && replacement) await setDefaultAddress(id).catch(() => {})
    throw error
  }
}

export function formatAddress(address: Pick<Address, 'detailAddress' | 'ward' | 'district' | 'province'>) {
  return [address.detailAddress, address.ward, address.district, address.province].filter(Boolean).join(', ')
}
