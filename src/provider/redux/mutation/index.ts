import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Cart } from "@/interfaces/cart.interface";

export const fakeStoreApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://fakestoreapi.com",
  }),
  endpoints: (build) => ({
    addCart: build.mutation({
      query: (cart: Cart) => ({
        url: `/carts`,
        method: "POST",
        body: cart,
      }),
    }),
  }),
});

export const { useAddCartMutation } = fakeStoreApi;
