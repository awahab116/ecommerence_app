import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { productApi } from "./query";
import { stripeApi } from "./query/stripe";
import { fakeStoreApi } from "./mutation";
import { setupListeners } from "@reduxjs/toolkit/query";
import cartSlice from "./cartSlice";

export const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    [stripeApi.reducerPath]: stripeApi.reducer,
    [fakeStoreApi.reducerPath]: fakeStoreApi.reducer,
    cart: cartSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productApi.middleware)
      .concat(stripeApi.middleware)
      .concat(fakeStoreApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

setupListeners(store.dispatch);
