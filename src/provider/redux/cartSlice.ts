import { createSlice } from "@reduxjs/toolkit";
import { Cart } from "@/interfaces/cart.interface";

const initialState: Cart = {
  date: new Date().toISOString(),
  products: [],
  totalPrice: 0, // Initialize totalPrice
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
        existingProduct.quantity += quantity ? quantity : 0;
        state.totalPrice += price * (quantity ? quantity : 0); // Update totalPrice
      } else {
        state.products.push(action.payload);
        state.totalPrice += price * (quantity ? quantity : 0); // Update totalPrice
      }
    },
    removeProduct: (state, action) => {
      const { productId, price } = action.payload;
      const removedProduct = state.products.find(
        (product) => product.productId === productId
      );
      if (removedProduct) {
        state.totalPrice -= price * removedProduct.quantity; // Deduct price of removed product
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
        state.totalPrice += (quantity - product.quantity) * price; // Adjust total price based on quantity change
        product.quantity = quantity;
      } else {
        state.products.push(action.payload);
        state.totalPrice += price * quantity; // Add the price of the new product to total price
      }
    },
  },
});

export const { addProduct, removeProduct, updateProductQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
