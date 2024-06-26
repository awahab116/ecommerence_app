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
    getProduct: builder.query<
      { products: ProductInfo[]; totalProducts: number },
      { page: number; limit: number }
    >({
      query: ({ page, limit }) => ({
        url: `/products?page=${page}&limit=${limit}`,
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
    getProductByCategory: builder.query<
      { products: ProductInfo[]; totalProducts: number },
      {
        category: string | string[];
        page: number;
        limit: number;
      }
    >({
      query: ({ category, page, limit }) => ({
        url: `/products/category/?category=${category}&page=${page}&limit=${limit}`,
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
    getOrders: builder.query<
      { order: Order[]; totalOrders: number },
      { page: number; limit: number }
    >({
      query: () => ({
        url: "/orders?page=${page}&limit=${limit}",
        method: "GET",
      }),
    }),
    deleteProduct: builder.mutation<void, number>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
    }),
    adminStats: builder.query<
      {
        totalProducts: number;
        totalOrders: number;
        totalUsers: number;
        totalRevenue: number;
      },
      void
    >({
      query: () => ({
        url: "/stats",
        method: "GET",
      }),
    }),
    searchProduct: builder.query<
      { products: ProductInfo[]; totalProducts: number },
      {
        search: string;
        page: number;
        limit: number;
      }
    >({
      query: ({ search, page, limit }) => ({
        url: `/products/search?search=${search}&page=${page}&limit=${limit}`,
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
  useDeleteProductMutation,
  useAdminStatsQuery,
  useSearchProductQuery,
} = fakeStoreQueryApi;
