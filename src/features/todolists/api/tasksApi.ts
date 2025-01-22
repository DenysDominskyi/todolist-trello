import { instance } from "common/instance"
import { BaseResponse } from "common/types"
import { DomainTask, GetTasksResponse, UpdateTaskModel } from "./tasksApi.types"
import { baseApi } from "baseApi"

export const COUNT = 4

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<GetTasksResponse, {todolistId: string; args: {page: number}}>({
      query: ({todolistId, args}) => {
        return {
          url: `todo-lists/${todolistId}/tasks`,
          params: {...args, count: COUNT},
          method: "GET",
        }
      },
      providesTags: (res, error, {todolistId}) =>
        res
          ? [
              ...res.items.map((task) => {
                return { type: "Task", id: task.id } as const
              }),
              { type: "Task", id: todolistId },
            ]
          : ["Task"],
    }),
    createTask: builder.mutation<BaseResponse<{ item: DomainTask }>, { title: string; todolistId: string }>({
      query: ({ title, todolistId }) => ({
        url: `todo-lists/${todolistId}/tasks`,
        method: "POST",
        body: { title },
      }),
      invalidatesTags: (result, error, { todolistId }) => [{ type: "Task", id: todolistId }],
    }),
    deleteTask: builder.mutation<BaseResponse, { todolistId: string; taskId: string }>({
      query: ({ todolistId, taskId }) => ({
        url: `todo-lists/${todolistId}/tasks/${taskId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { taskId }) => [{ type: "Task", id: taskId }],
    }),
    updateTask: builder.mutation<
      BaseResponse<{ item: DomainTask }>,
      { todolistId: string; taskId: string; model: UpdateTaskModel }
    >({
      query: ({ todolistId, taskId, model }) => {
        return {
          url: `todo-lists/${todolistId}/tasks/${taskId}`,
          method: "PUT",
          body: model,
        }
      },
      invalidatesTags: (result, error, { taskId }) => [{ type: "Task", id: taskId }],
    }),
  }),
})

export const { useGetTasksQuery, useCreateTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation } = tasksApi