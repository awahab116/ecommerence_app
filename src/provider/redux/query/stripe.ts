import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface stripeResponse {
  clientSecret: string;
}

export const stripeApi = createApi({
  reducerPath: "stripeApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  endpoints: (builder) => ({
    getStripe: builder.query<stripeResponse, number>({
      query: (price) => ({
        url: "/api/stripe",
        method: "GET",
        params: { price },
      }),
    }),
  }),
});

export const { useGetStripeQuery } = stripeApi;
