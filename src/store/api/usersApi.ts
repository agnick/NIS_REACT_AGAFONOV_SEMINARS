import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface CreateUserDto {
  name: string;
  email: string;
}

export interface UpdateUserDto {
  id: number;
  name: string;
  email: string;
}

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => 'users',
      providesTags: ['Users'],
    }),
    addUser: builder.mutation<User, CreateUserDto>({
      query: (user) => ({
        url: 'users',
        method: 'POST',
        body: user,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data: newUser } = await queryFulfilled;
          dispatch(
            usersApi.util.updateQueryData('getUsers', undefined, (draft) => {
              draft.unshift(newUser);
            })
          );
        } catch {}
      },
    }),
    updateUser: builder.mutation<User, UpdateUserDto>({
      query: ({ id, ...body }) => ({
        url: `users/${id}`,
        method: 'PUT',
        body,
      }),
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        try {
          const { data: updatedUser } = await queryFulfilled;
          dispatch(
            usersApi.util.updateQueryData('getUsers', undefined, (draft) => {
              const index = draft.findIndex((user) => user.id === id);
              if (index !== -1) {
                draft[index] = updatedUser;
              }
            })
          );
        } catch {}
      },
    }),
  }),
});

export const { useGetUsersQuery, useAddUserMutation, useUpdateUserMutation } = usersApi;
