import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { addCartItem, getCartItems } from '../api/cartApi'
import type { CartItem } from '../api/cartApi'
import type { Product } from '../data/products'
import type { RootState } from './store'

interface CartState {
  items: CartItem[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string
  saving: boolean
}

const initialState: CartState = { items: [], status: 'idle', error: '', saving: false }

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

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadCart.pending, (state) => {
        state.status = 'loading'
        state.error = ''
      })
      .addCase(loadCart.fulfilled, (state, action) => {
        state.items = action.payload
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
        state.saving = false
      })
      .addCase(addToCart.rejected, (state) => {
        state.saving = false
        state.error = 'Không thêm được sản phẩm. Vui lòng thử lại.'
      })
  },
})

export default cartSlice.reducer
