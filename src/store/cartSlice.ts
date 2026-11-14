import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { addCartItem, deleteCartItem, getCartItems, updateCartQuantity } from '../api/cartApi'
import type { CartItem } from '../api/cartApi'
import type { Product } from '../data/products'
import type { RootState } from './store'

interface CartState {
  items: CartItem[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string
  saving: boolean
  selectedIds: string[]
}

const initialState: CartState = { items: [], status: 'idle', error: '', saving: false, selectedIds: [] }

export const loadCart = createAsyncThunk('cart/load', getCartItems, {
  condition: (_, { getState }) => {
    const cart = (getState() as RootState).cart
    return cart.status !== 'loading' && !cart.saving
  },
})

export const addToCart = createAsyncThunk('cart/add', (product: Product) => addCartItem(product), {
  condition: (_, { getState }) => {
    const cart = (getState() as RootState).cart
    return cart.status === 'succeeded' && !cart.saving
  },
})

export const changeQuantity = createAsyncThunk(
  'cart/changeQuantity',
  ({ id, quantity }: Pick<CartItem, 'id' | 'quantity'>) => updateCartQuantity(id, quantity),
  {
    condition: (_, { getState }) => {
      const cart = (getState() as RootState).cart
      return cart.status === 'succeeded' && !cart.saving
    },
  },
)

export const removeFromCart = createAsyncThunk('cart/remove', async (id: string) => {
  await deleteCartItem(id)
  return id
}, {
  condition: (_, { getState }) => {
    const cart = (getState() as RootState).cart
    return cart.status === 'succeeded' && !cart.saving
  },
})

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleItem(state, action: PayloadAction<string>) {
      const id = action.payload
      if (state.selectedIds.includes(id)) state.selectedIds = state.selectedIds.filter((selected) => selected !== id)
      else if (state.items.some((item) => item.id === id)) state.selectedIds.push(id)
    },
    toggleAll(state) {
      state.selectedIds = state.selectedIds.length === state.items.length ? [] : state.items.map((item) => item.id)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCart.pending, (state) => {
        state.status = 'loading'
        state.error = ''
      })
      .addCase(loadCart.fulfilled, (state, action) => {
        state.items = action.payload
        state.selectedIds = action.payload.map((item) => item.id)
        state.status = 'succeeded'
      })
      .addCase(loadCart.rejected, (state) => {
        state.status = 'failed'
        state.error = 'Không tải được giỏ hàng. Hãy kiểm tra JSON Server và thử lại.'
      })
      .addCase(addToCart.pending, (state) => {
        state.saving = true
        state.error = ''
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item.id === action.payload.id)
        if (index === -1) state.items.push(action.payload)
        else state.items[index] = action.payload
        if (!state.selectedIds.includes(action.payload.id)) state.selectedIds.push(action.payload.id)
        state.saving = false
      })
      .addCase(addToCart.rejected, (state) => {
        state.saving = false
        state.error = 'Không thêm được sản phẩm. Vui lòng thử lại.'
      })
      .addCase(changeQuantity.pending, (state) => {
        state.saving = true
        state.error = ''
      })
      .addCase(changeQuantity.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item.id === action.payload.id)
        if (index !== -1) state.items[index] = action.payload
        state.saving = false
      })
      .addCase(changeQuantity.rejected, (state) => {
        state.saving = false
        state.error = 'Không cập nhật được số lượng. Vui lòng thử lại.'
      })
      .addCase(removeFromCart.pending, (state) => {
        state.saving = true
        state.error = ''
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload)
        state.selectedIds = state.selectedIds.filter((id) => id !== action.payload)
        state.saving = false
      })
      .addCase(removeFromCart.rejected, (state) => {
        state.saving = false
        state.error = 'Không xóa được sản phẩm. Vui lòng thử lại.'
      })
  },
})

export const { toggleItem, toggleAll } = cartSlice.actions
export default cartSlice.reducer
