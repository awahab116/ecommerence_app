import { ProductInfo } from "@/interfaces/product.interface";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://fakestoreapi.com" }),
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
  }),
});

export const {
  useGetProductQuery,
  useGetProductByLimitQuery,
  useGetProductByIdQuery,
} = productApi;
