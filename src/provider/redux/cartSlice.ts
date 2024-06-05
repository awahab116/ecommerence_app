import { createSlice } from "@reduxjs/toolkit";
import { Dispatch } from "redux";
import { Cart } from "@/interfaces/cart.interface";

const initialState: Cart = {
  date: new Date().toISOString(),
  products: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      console.log("addProduct", action.payload);
      state.products.push(action.payload);
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.productId !== action.payload
      );
    },
  },
});

export const { addProduct, removeProduct } = cartSlice.actions;

export default cartSlice.reducer;
