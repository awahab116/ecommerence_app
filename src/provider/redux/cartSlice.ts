import { createSlice } from "@reduxjs/toolkit";
import { Cart, CartItem } from "@/interfaces/cart.interface";
import Product from "@/components/product";

const initialState: Cart = {
  date: new Date().toISOString(),
  userId: 1,
  products: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const { productId: id, quantity, price } = action.payload; // Destructure payload

      const existingProductIndex = state.products.findIndex(
        (product: CartItem) => product.productId === id
      );

      if (existingProductIndex !== -1) {
        // Product already exists, update quantity
        state.products[existingProductIndex] = {
          ...state.products[existingProductIndex], // Spread existing product
          quantity: state.products[existingProductIndex].quantity + quantity, // Update quantity
        };
      } else {
        // Product does not exist, add new product to state
        state.products.push({
          productId: id,
          quantity,
        });
      }

      state.totalPrice += price * quantity; // Update total price
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
    resetCart: (state) => {
      return initialState;
    },
  },
});

export const { addProduct, removeProduct, updateProductQuantity, resetCart } =
  cartSlice.actions;

export default cartSlice.reducer;
