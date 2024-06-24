import { ProductInfo } from "@/interfaces/product.interface";
import { Order } from "@/interfaces/order.interface";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

interface stripeResponse {
  clientSecret: string;
}

export const fakeStoreQueryApi = createApi({
  reducerPath: "fakeStoreQueryApi",
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
  endpoints: (builder) => ({
    getProduct: builder.query<ProductInfo[], void>({
      query: () => ({
        url: "/products",
        method: "GET",
      }),
    }),
    getProductByLimit: builder.query<ProductInfo[], number>({
      query: (limit) => ({
        url: `/products?limit=${limit}`,
        method: "GET",
      }),
    }),
    getProductById: builder.query<ProductInfo, number>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
    }),
    getProductByCategory: builder.query<ProductInfo[], string | string[]>({
      query: (category) => ({
        url: `/products/category/${category}`,
        method: "GET",
      }),
    }),
    getProductCategory: builder.query<string[], void>({
      query: () => ({
        url: "/products/categories",
        method: "GET",
      }),
    }),
    getStripe: builder.query<stripeResponse, string | string[]>({
      query: (id) => ({
        url: "/stripe/create-payment-intent",
        method: "GET",
        params: { id },
      }),
    }),
    getOrders: builder.query<Order[], void>({
      query: () => ({
        url: "/orders",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetProductQuery,
  useGetProductByLimitQuery,
  useGetProductByIdQuery,
  useGetProductCategoryQuery,
  useGetProductByCategoryQuery,
  useGetStripeQuery,
  useGetOrdersQuery,
} = fakeStoreQueryApi;
