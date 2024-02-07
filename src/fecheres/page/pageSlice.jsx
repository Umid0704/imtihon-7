import { api } from "../api/apiSlice";
export const  pageSlice = api.injectEndpoints({
    endpoints:builder =>({
        getAuthor: builder.query({
            query: () => "/author",
            providesTags: ["author"],
          }),
          addAuthor: builder.mutation({
            query: (payload) => ({
              url: "/author",
              method: "POST",
              body: payload,
            }),
            invalidatesTags: ["author"],
          }), 
          updateAuthor: builder.mutation({
            query: (payload) => ({
              url: `/author/${payload.id}`,
              method: "PUT",
              body: payload,
            }),
            invalidatesTags: ["author"],
          }),
          deleteAuthor: builder.mutation({
            query: (id) => ({
              url: `/author/${id}`,
              method: "DELETE",
            }),
            invalidatesTags: ["author"],
          }),
    })
})
export const {useAddAuthorMutation, useDeleteAuthorMutation, useGetAuthorQuery, useUpdateAuthorMutation} = pageSlice