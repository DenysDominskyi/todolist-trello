import { instance } from "common/instance"
import { BaseResponse } from "common/types"
import { LoginArgs } from "./authAPI.types"
import { baseApi } from "baseApi"

export const authAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    me: builder.query<BaseResponse<{ userId: number; token: string }>, void>({
      query: () => ({
        method: "GET",
        url: "auth/me",
      }),
    }),
    login: builder.mutation<BaseResponse<{ userId: number; token: string }>, LoginArgs>({
      query: (arg) => ({
        method: "POST",
        url: "auth/login",
        body: arg,
      }),
    }),
    logout: builder.mutation<BaseResponse, void>({
      query: () => ({
        method: "DELETE",
        url: "auth/login",
      }),
    }),
  }),
})

export const { useLoginMutation, useMeQuery, useLogoutMutation } = authAPI

//DONT USES
// export const _authApi = {
//   login(payload: LoginArgs) {
//     return instance.post<BaseResponse<{ userId: number; token: string }>>(`auth/login`, payload)
//   },
//   logout() {
//     return instance.delete<BaseResponse>("auth/login")
//   },
//   me() {
//     return instance.get<BaseResponse<{ id: number; email: string; login: string }>>("auth/me")
//   },
// }
