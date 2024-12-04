import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'; // Ensure `/react` is included
import type {
  UserLoginRequest,
  UserRegisterReqeust,
  UserResponse,
} from '../types/Users';
import baseUrl from '../utils/baseUrl';
export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: (builder) => ({
    login: builder.mutation<UserResponse, UserLoginRequest>({
      query: (loginCredentials) => ({
        method: 'POST',
        url: '/api/users/login',
        body: loginCredentials,
      }),
      transformResponse: (response: UserResponse) => {
        return response;
      },
    }),
    register: builder.mutation<UserResponse, UserRegisterReqeust>({
      query: (registerCredentials) => ({
        method: 'POST',
        url: '/api/users/register',
        body: registerCredentials,
      }),
      transformResponse: (response: UserResponse) => {
        return response;
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = usersApi;
