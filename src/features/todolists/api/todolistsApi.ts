import { BaseResponse } from "common/types"
import { Todolist } from "./todolistsApi.types"
import { baseApi } from "baseApi"
import { FilterValuesType } from "../ui/Todolists/Todolist/FilterTasksButtons/FilterTasksButtons"
import { RequestStatus } from "app/appSlice"

export type DomainTodolist = Todolist & {
  filter: FilterValuesType
  entityStatus: RequestStatus
}

export const todolistsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTodolists: builder.query<DomainTodolist[], void>({
      query: () => ({
        url: "todo-lists",
        method: "GET",
      }),
      transformResponse(todolists: Todolist[]): DomainTodolist[] {
        return todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }))
      },
      providesTags: ["Todolist"],
    }),
    createTodolist: builder.mutation<BaseResponse<{ item: Todolist }>, string>({
      query: (title: any) => ({
        method: "POST",
        url: "todo-lists",
        body: { title },
      }),
      invalidatesTags: ["Todolist"],
    }),
    deleteTodolist: builder.mutation<BaseResponse, string>({
      query: (id: string) => ({
        method: "DELETE",
        url: `todo-lists/${id}`,
      }),
      invalidatesTags: ["Todolist"],
    }),
    updateTodolistTitle: builder.mutation<BaseResponse, { id: string; title: string }>({
      query: ({ id, title }) => ({
        method: "PUT",
        url: `todo-lists/${id}`,
        body: { title },
      }),
      invalidatesTags: ["Todolist"],
    }),
  }),
})

export const {
  useGetTodolistsQuery,
  useCreateTodolistMutation,
  useDeleteTodolistMutation,
  useUpdateTodolistTitleMutation,
} = todolistsApi