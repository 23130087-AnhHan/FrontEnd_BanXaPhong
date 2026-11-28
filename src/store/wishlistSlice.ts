import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Product } from '../components/ProductCard'

interface WishlistState {
  items: Product[]
}

const initialState: WishlistState = {
  items: [],
}

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    replaceWishlist(state, action: PayloadAction<Product[]>) {
      state.items = action.payload
    },
    toggleWishlist(state, action: PayloadAction<Product>) {
      const index = state.items.findIndex((p) => String(p.id) === String(action.payload.id))
      if (index >= 0) {
        state.items.splice(index, 1)
      } else {
        state.items.push(action.payload)
      }
    },
  },
})

export const { replaceWishlist, toggleWishlist } = wishlistSlice.actions
export default wishlistSlice.reducer

