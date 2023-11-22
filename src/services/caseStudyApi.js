import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const caseStudyApi = createApi({
  reducerPath: "caseStudyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://linkedin-cv-crawler.beta-limited.workers.dev/interview",
    prepareHeaders: (headers, { getState }) => {
      headers.set("Session-ID", getState()?.caseStudyUi?.sessionId);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createSession: builder.query({
      query: () => ({
        url: `createsession`,
        responseHandler: (response) => response.text(),
      }),
    }),
    listProducts: builder.query({
      query: () => "products",
    }),
    searchProduct: builder.query({
      query: (param) => `search?name=${param}`,
    }),
    addToCart: builder.mutation({
      query: ({ id }) => ({
        url: `add-to-cart?id=${id}`,
        method: "POST",
      }),
    }),
    viewCart: builder.query({
      query: () => ({
        url: "view-cart",
      }),
    }),
  }),
});

export const {
  useLazyListProductsQuery,
  useCreateSessionQuery,
  useListProductsQuery,
  useLazySearchProductQuery,
  useAddToCartMutation,
  useViewCartQuery,
} = caseStudyApi;
