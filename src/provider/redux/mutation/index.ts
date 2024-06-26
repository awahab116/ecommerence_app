import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Cart } from "@/interfaces/cart.interface";
import { getSession } from "next-auth/react";
import { addProduct } from "../cartSlice";

export const fakeStoreMutationApi = createApi({
  reducerPath: "fakeStoreMutationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000",
    prepareHeaders: async (headers) => {
      const session = await getSession();
      if (session?.accessToken) {
        headers.set("Authorization", `Bearer ${session.accessToken}`);
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    addCart: build.mutation({
      query: (cart: Cart) => ({
        url: `/orders`,
        method: "POST",
        body: cart,
      }),
    }),
    addProduct: build.mutation({
      query: (product) => ({
        url: "/products",
        method: "POST",
        body: product,
      }),
    }),
    editProduct: build.mutation({
      query: ({ id, ...product }) => ({
        url: `/products/${id}`,
        method: "PATCH",
        body: product,
      }),
    }),
  }),
});

export const {
  useAddCartMutation,
  useEditProductMutation,
  useAddProductMutation,
} = fakeStoreMutationApi;
