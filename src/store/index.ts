import { configureStore } from "@reduxjs/toolkit";
import categoriesSlice from "./categories/categories.slice";
import userSlice from "./user/user.slice";
import productsSlice from "./products/products.slice";
import cartSlice from "./cart/cart.slice";
import productSlice from "./products/product.slice";
import orderSlice from "./order/order.slice";

export const store = configureStore({
  reducer: {
    userSlice,
    categoriesSlice,
    productsSlice,
    productSlice,
    cartSlice,
    orderSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
