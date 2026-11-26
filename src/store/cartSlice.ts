import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { addCartItem, deleteCartItem, getCartItems, updateCartQuantity } from '../api/cartApi'
import type { CartItem } from '../api/cartApi'
import type { Product } from '../components/ProductCard'
import type { RootState } from './store'
import { layNguoiDungHienTai } from '../api/authApi'
import { createCodOrder, cleanupCodCart } from '../api/checkoutApi'
import type { CodOrderInput } from '../api/checkoutApi'

interface CartState {
  items: CartItem[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string
  saving: boolean
  selectedIds: string[]
  message: string
  userId: string | null
  requestId: string | null
}

const initialState: CartState = { items: [], status: 'idle', error: '', saving: false, selectedIds: [], message: '', userId: null, requestId: null }

export const loadCart = createAsyncThunk('cart/load', async () => {
  const userId = layNguoiDungHienTai()?.id ?? null
  const items = userId ? await getCartItems(userId) : []
  return { userId, items }
}, {
  condition: (_, { getState }) => {
    const cart = (getState() as RootState).cart
    return cart.status !== 'loading' && !cart.saving
  },
})

export const addToCart = createAsyncThunk('cart/add', (product: Product) => addCartItem(product), {
  condition: (_, { getState }) => {
    const cart = (getState() as RootState).cart
    return cart.status === 'succeeded' && !cart.saving && cart.userId === layNguoiDungHienTai()?.id
  },
})

export const changeQuantity = createAsyncThunk(
  'cart/changeQuantity',
  ({ id, quantity }: Pick<CartItem, 'id' | 'quantity'>) => updateCartQuantity(id, quantity),
  {
    condition: (_, { getState }) => {
      const cart = (getState() as RootState).cart
      return cart.status === 'succeeded' && !cart.saving && cart.userId === layNguoiDungHienTai()?.id
    },
  },
)

export const removeFromCart = createAsyncThunk('cart/remove', async (id: string) => {
  await deleteCartItem(id)
  return id
}, {
  condition: (_, { getState }) => {
    const cart = (getState() as RootState).cart
    return cart.status === 'succeeded' && !cart.saving && cart.userId === layNguoiDungHienTai()?.id
  },
})

export const checkoutCod = createAsyncThunk('cart/checkoutCod', async (input: CodOrderInput) => {
  const order = await createCodOrder(input)
  let cleanup = { removedIds: [] as string[], incomplete: true }
  try { cleanup = await cleanupCodCart(order.id) } catch {}
  return { order, ...cleanup }
}, {
  condition: (_, { getState }) => {
    const cart = (getState() as RootState).cart
    return cart.status === 'succeeded' && !cart.saving && cart.userId === layNguoiDungHienTai()?.id
  },
})

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    resetCart(_state, action: PayloadAction<string | null>) {
      return { ...initialState, userId: action.payload }
    },
    clearFeedback(state) {
      state.error = ''
      state.message = ''
    },
    toggleItem(state, action: PayloadAction<string>) {
      const id = action.payload
      if (state.selectedIds.includes(id)) state.selectedIds = state.selectedIds.filter((selected) => selected !== id)
      else if (state.items.some((item) => item.id === id)) state.selectedIds.push(id)
    },
    toggleAll(state) {
      state.selectedIds = state.selectedIds.length === state.items.length ? [] : state.items.map((item) => item.id)
    },
    selectItems(state, action: PayloadAction<string[]>) {
      state.selectedIds = state.items.filter((item) => action.payload.includes(item.id)).map((item) => item.id)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCart.pending, (state, action) => {
        state.requestId = action.meta.requestId
        state.status = 'loading'
        state.error = ''
        state.message = ''
      })
      .addCase(loadCart.fulfilled, (state, action) => {
        if (state.requestId !== action.meta.requestId) return
        state.requestId = null
        state.userId = action.payload.userId
        state.items = action.payload.items
        state.selectedIds = action.payload.items.map((item) => item.id)
        state.status = 'succeeded'
      })
      .addCase(loadCart.rejected, (state, action) => {
        if (state.requestId !== action.meta.requestId) return
        state.requestId = null
        state.status = 'failed'
        state.error = 'Không tải được giỏ hàng. Vui lòng thử lại.'
      })
      .addCase(addToCart.pending, (state, action) => {
        state.requestId = action.meta.requestId
        state.saving = true
        state.error = ''
        state.message = ''
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        if (state.requestId !== action.meta.requestId) return
        state.requestId = null
        const index = state.items.findIndex((item) => item.id === action.payload.id)
        if (index === -1) state.items.push(action.payload)
        else state.items[index] = action.payload
        if (!state.selectedIds.includes(action.payload.id)) state.selectedIds.push(action.payload.id)
        state.saving = false
        state.message = 'Đã thêm ' + action.payload.name + ' vào giỏ hàng.'
      })
      .addCase(addToCart.rejected, (state, action) => {
        if (state.requestId !== action.meta.requestId) return
        state.requestId = null
        state.saving = false
        state.error = 'Không thêm được sản phẩm. Vui lòng thử lại.'
      })
      .addCase(changeQuantity.pending, (state, action) => {
        state.requestId = action.meta.requestId
        state.saving = true
        state.error = ''
        state.message = ''
      })
      .addCase(changeQuantity.fulfilled, (state, action) => {
        if (state.requestId !== action.meta.requestId) return
        state.requestId = null
        const index = state.items.findIndex((item) => item.id === action.payload.id)
        if (index !== -1) state.items[index] = action.payload
        state.saving = false
        state.message = 'Đã cập nhật số lượng.'
      })
      .addCase(changeQuantity.rejected, (state, action) => {
        if (state.requestId !== action.meta.requestId) return
        state.requestId = null
        state.saving = false
        state.error = 'Không cập nhật được số lượng. Vui lòng thử lại.'
      })
      .addCase(removeFromCart.pending, (state, action) => {
        state.requestId = action.meta.requestId
        state.saving = true
        state.error = ''
        state.message = ''
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        if (state.requestId !== action.meta.requestId) return
        state.requestId = null
        state.items = state.items.filter((item) => item.id !== action.payload)
        state.selectedIds = state.selectedIds.filter((id) => id !== action.payload)
        state.saving = false
        state.message = 'Đã xóa sản phẩm khỏi giỏ hàng.'
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        if (state.requestId !== action.meta.requestId) return
        state.requestId = null
        state.saving = false
        state.error = 'Không xóa được sản phẩm. Vui lòng thử lại.'
      })
      .addCase(checkoutCod.pending, (state, action) => {
        state.requestId = action.meta.requestId
        state.saving = true
        state.error = ''
        state.message = ''
      })
      .addCase(checkoutCod.fulfilled, (state, action) => {
        if (state.requestId !== action.meta.requestId) return
        state.requestId = null
        state.saving = false
        state.items = state.items.filter((item) => !action.payload.removedIds.includes(item.id))
        state.selectedIds = state.selectedIds.filter((id) => !action.payload.removedIds.includes(id))
      })
      .addCase(checkoutCod.rejected, (state, action) => {
        if (state.requestId !== action.meta.requestId) return
        state.requestId = null
        state.saving = false
        state.error = action.error.message || 'Chưa đặt được đơn hàng. Vui lòng thử lại.'
      })
  },
})

export const { toggleItem, toggleAll, selectItems, clearFeedback, resetCart } = cartSlice.actions
export default cartSlice.reducer
