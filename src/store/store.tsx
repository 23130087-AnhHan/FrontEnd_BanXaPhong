import { configureStore } from "@reduxjs/toolkit";
import  productSlice from '../components/ProductSlice'
import cartReducer from './cartSlice'
import wishlistReducer from './wishlistSlice'

export const store = configureStore({
    reducer: {
        products: productSlice,
        cart: cartReducer,
        wishlist: wishlistReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
