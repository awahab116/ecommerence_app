import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { fakeStoreQueryApi } from "./query";
import { fakeStoreMutationApi } from "./mutation";
import { setupListeners } from "@reduxjs/toolkit/query";
import cartSlice from "./cartSlice";

export const store = configureStore({
  reducer: {
    [fakeStoreQueryApi.reducerPath]: fakeStoreQueryApi.reducer,
    [fakeStoreMutationApi.reducerPath]: fakeStoreMutationApi.reducer,
    cart: cartSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(fakeStoreQueryApi.middleware)
      .concat(fakeStoreMutationApi.middleware),
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
