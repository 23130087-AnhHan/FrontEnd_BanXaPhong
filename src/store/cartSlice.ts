import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getCartItems } from '../api/cartApi'
import type { CartItem } from '../api/cartApi'
import type { RootState } from './store'

interface CartState {
  items: CartItem[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string
}

const initialState: CartState = { items: [], status: 'idle', error: '' }

export const loadCart = createAsyncThunk('cart/load', getCartItems, {
  condition: (_, { getState }) => (getState() as RootState).cart.status !== 'loading',
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
  },
})

export default cartSlice.reducer
