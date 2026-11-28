import { configureStore } from "@reduxjs/toolkit";
import  productSlice from '../components/ProductSlice'
import cartReducer from './cartSlice'
import wishlistReducer, { replaceWishlist } from './wishlistSlice'
import type { Product } from '../components/ProductCard'
import { layNguoiDungHienTai } from '../api/authApi'

const wishlistStorageKey = (userId: string) => `saponi:wishlist:${encodeURIComponent(userId)}`

function loadWishlistForCurrentUser(): Product[] {
    const userId = layNguoiDungHienTai()?.id
    if (!userId) return []

    try {
        const saved = localStorage.getItem(wishlistStorageKey(userId))
        if (!saved) return []
        const parsed: unknown = JSON.parse(saved)
        return Array.isArray(parsed) ? parsed.filter((item): item is Product => Boolean(item && typeof item.id !== 'undefined' && typeof item.name === 'string')) : []
    } catch {
        return []
    }
}

export const store = configureStore({
    reducer: {
        products: productSlice,
        cart: cartReducer,
        wishlist: wishlistReducer,
    },
    preloadedState: {
        wishlist: { items: loadWishlistForCurrentUser() },
    },
})

store.subscribe(() => {
    const userId = layNguoiDungHienTai()?.id
    if (!userId) return

    try {
        localStorage.setItem(wishlistStorageKey(userId), JSON.stringify(store.getState().wishlist.items))
    } catch {
    }
})

function syncWishlistWithCurrentUser() {
    store.dispatch(replaceWishlist(loadWishlistForCurrentUser()))
}

if (typeof window !== 'undefined') {
    window.addEventListener('auth-change', syncWishlistWithCurrentUser)
    window.addEventListener('storage', (event) => {
        if (event.key === 'nguoiDungHienTai' || event.key === null) syncWishlistWithCurrentUser()
    })
}

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
