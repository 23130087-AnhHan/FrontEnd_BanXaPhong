import { configureStore } from "@reduxjs/toolkit";
import  productSlice from '../components/ProductSlice'

export const store = configureStore({
    reducer: {
        products: productSlice,
    }
})