import { ProductInfo } from "@/interfaces/product.interface";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const fakeStoreQueryApi = createApi({
  reducerPath: "fakeStoreQueryApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000" }),
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
  }),
});

export const {
  useGetProductQuery,
  useGetProductByLimitQuery,
  useGetProductByIdQuery,
  useGetProductCategoryQuery,
  useGetProductByCategoryQuery,
} = fakeStoreQueryApi;
