import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import cartReducer from "@/provider/redux/cartSlice";
import { fakeStoreQueryApi } from "@/provider/redux/query";

// Define initial root reducer object
const mockRootReducer = {
  cart: cartReducer,
  [fakeStoreQueryApi.reducerPath]: fakeStoreQueryApi.reducer,
};

// Configure mock store
const mockStore = configureStore({
  reducer: mockRootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(fakeStoreQueryApi.middleware),
});

export type MockAppDispatch = typeof mockStore.dispatch;
export type MockRootState = ReturnType<typeof mockStore.getState>;
export type MockAppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  MockRootState,
  unknown,
  Action<string>
>;

setupListeners(mockStore.dispatch);

export default mockStore;
