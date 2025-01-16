import List from "@mui/material/List"
import { TaskStatus } from "common/enums"
import { DomainTodolist } from "../../../../model/todolistsSlice"
import { Task } from "./Task/Task"
import { useGetTasksQuery } from "features/todolists/api/tasksApi"
import { TasksSkeleton } from "features/todolists/ui/skeletons/TaskSeleton/TasksSkeleton"
import { TasksPaginations } from "../TasksPagination/TasksPaginations"
import { useState } from "react"

type Props = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: Props) => {

  const [page, setPage] = useState(1)

  const { data, isLoading } = useGetTasksQuery({ todolistId: todolist.id, args: { page } })
  let tasksForTodolist = data?.items

  if (todolist.filter === "active") {
    tasksForTodolist = tasksForTodolist?.filter((task) => task.status === TaskStatus.New)
  }

  if (todolist.filter === "completed") {
    tasksForTodolist = tasksForTodolist?.filter((task) => task.status === TaskStatus.Completed)
  }

  if (isLoading) {
    return <TasksSkeleton />
  }

  return (
    <>
      {tasksForTodolist?.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <>
          <List>
            {tasksForTodolist?.map((task) => {
              return <Task key={task.id} task={task} todolist={todolist} />
            })}
          </List>
          {(data?.totalCount || 0) >= 10 && <TasksPaginations totalCount={data?.totalCount || 0} page={page} setPage={setPage} />}
        </>
      )}
    </>
  )
}
