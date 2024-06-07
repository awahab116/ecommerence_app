import { createSlice } from "@reduxjs/toolkit";
import { Cart } from "@/interfaces/cart.interface";

const initialState: Cart = {
  date: new Date().toISOString(),
  products: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const { productId, quantity, price } = action.payload;
      console.log("addProduct", action.payload);
      const existingProduct = state.products.find(
        (product) => product.productId === productId
      );

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        state.products.push(action.payload);
      }

      state.totalPrice += price * quantity;
    },
    removeProduct: (state, action) => {
      const { productId, price } = action.payload;
      const removedProduct = state.products.find(
        (product) => product.productId === productId
      );
      if (removedProduct) {
        state.totalPrice -= price * removedProduct.quantity;
        state.products = state.products.filter(
          (product) => product.productId !== productId
        );
      }
    },
    updateProductQuantity: (state, action) => {
      const { productId, quantity, price } = action.payload;
      console.log("updateProductQuantity", action.payload);
      const product = state.products.find((p) => p.productId === productId);
      if (product) {
        state.totalPrice += (quantity - product.quantity) * price;
        product.quantity = quantity;
      } else {
        state.products.push(action.payload);
        state.totalPrice += price * quantity;
      }
    },
  },
});

export const { addProduct, removeProduct, updateProductQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
