import { api } from "../api/apiSlice";
export const  bookSlice = api.injectEndpoints({
    endpoints:builder =>({
        getBook: builder.query({
            query: () => "book",
            providesTags: ["book"],
          }),
        getAuther: builder.query({
            query: () => "author",
            providesTags: ["book"],
          }),
        getCategory: builder.query({
            query: () => "category/get/all",
            providesTags: ["book"],
          }),
        
    })
})
export const { useGetBookQuery,useGetAutherQuery, useGetCategoryQuery} = bookSlice