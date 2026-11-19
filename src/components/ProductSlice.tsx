import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchProductsWithImages } from '../api/productApi'
import { bestSellers as defaultBestSellers, newProducts as defaultNewProducts, mostView as defaultMostView } from '../data/products'
import type { Product } from '../data/products'

export const loadProducts = createAsyncThunk('products/loadProducts', async () => {
  return await fetchProductsWithImages()
})

interface ProductState {
  items: Product[]
  bestSellers: Product[]
  newProducts: Product[]
  mostView: Product[]
  loading: boolean
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: ProductState = {
  items: [...defaultBestSellers, ...defaultNewProducts],
  bestSellers: defaultBestSellers,
  newProducts: defaultNewProducts,
  mostView: defaultMostView,
  loading: false,
  status: 'idle',
  error: null,
}

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadProducts.pending, (state) => {
        state.loading = true
        state.status = 'loading'
        state.error = null
      })
      .addCase(loadProducts.fulfilled, (state, action) => {
        state.loading = false
        state.status = 'succeeded'
        state.items = action.payload

        const sortedBySold = [...action.payload].sort(
          (a, b) => (Number(b.soldCount) || 0) - (Number(a.soldCount) || 0)
        )
        state.bestSellers = sortedBySold.slice(0, 4)
      })
      .addCase(loadProducts.rejected, (state, action) => {
        state.loading = false
        state.status = 'failed'
        state.error = action.error.message ?? 'Không thể tải danh sách sản phẩm'
      })
  },
})

export default productSlice.reducer
