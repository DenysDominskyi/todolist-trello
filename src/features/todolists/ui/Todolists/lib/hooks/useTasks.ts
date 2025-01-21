import { TaskStatus } from "common/enums"
import { useGetTasksQuery } from "features/todolists/api/tasksApi"
import { DomainTodolist } from "features/todolists/model/todolistsSlice"
import { useState } from "react"

export const useTasks = (todolist: DomainTodolist) => {
    const { filter, id } = todolist
   
    const [page, setPage] = useState(1)
   
    const { data, isLoading } = useGetTasksQuery({ todolistId: id, args: { page } })
   
    let tasks = data?.items
   
    if (filter === 'active') {
      tasks = tasks?.filter(task => task.status === TaskStatus.New)
    }
   
    if (filter === 'completed') {
      tasks = tasks?.filter(task => task.status === TaskStatus.Completed)
    }
   
    return { tasks, isLoading, page, setPage, totalCount: data?.totalCount }
  }