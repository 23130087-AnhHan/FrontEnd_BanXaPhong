const allowedImageTypes = ['image/jpeg', 'image/png', 'image/webp']
const maxImageSize = 5 * 1024 * 1024

interface CloudinaryUploadResponse {
  secure_url?: string
  error?: { message?: string }
}

export async function uploadReviewImage(file: File, signal?: AbortSignal): Promise<string> {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME?.trim()
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET?.trim()

  if (!cloudName || !uploadPreset) {
    throw new Error('Chưa cấu hình Cloudinary. Vui lòng bổ sung Cloud name và Upload preset.')
  }
  if (!allowedImageTypes.includes(file.type)) {
    throw new Error('Vui lòng chọn ảnh JPG, PNG hoặc WEBP.')
  }
  if (file.size > maxImageSize) {
    throw new Error('Mỗi ảnh cần có dung lượng không quá 5 MB.')
  }

  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', uploadPreset)

  let response: Response
  try {
    response = await fetch('https://api.cloudinary.com/v1_1/' + encodeURIComponent(cloudName) + '/image/upload', {
      method: 'POST',
      body: formData,
      signal,
    })
  } catch (error) {
    if (signal?.aborted) throw error
    throw new Error('Không thể kết nối Cloudinary. Vui lòng thử lại.')
  }

  const result: CloudinaryUploadResponse | null = await response.json().catch(() => null)
  if (!response.ok) {
    throw new Error(result?.error?.message ? 'Không thể tải ảnh: ' + result.error.message : 'Không thể tải ảnh lên Cloudinary. Vui lòng thử lại.')
  }
  if (typeof result?.secure_url !== 'string' || !result.secure_url.startsWith('https://')) {
    throw new Error('Cloudinary chưa trả về đường dẫn ảnh hợp lệ. Vui lòng thử lại.')
  }
  return result.secure_url
}
