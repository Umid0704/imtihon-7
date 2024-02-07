import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const api = createApi({
  reducer: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: "http://52.74.225.116:3001/api/" }),
  tagTypes: ["users", "author", "model"],
  endpoints: builder =>({})
})
