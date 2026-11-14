import { createSlice } from '@reduxjs/toolkit'
import { bestSellers, newProducts, mostView } from '../data/products'

const productSlice = createSlice({
  name: 'products',
  initialState: { bestSellers, newProducts, mostView },
  reducers: {},
})

export default productSlice.reducer
