import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Cart } from "@/interfaces/cart.interface";
import { getSession } from "next-auth/react";

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
  }),
});

export const { useAddCartMutation } = fakeStoreMutationApi;
