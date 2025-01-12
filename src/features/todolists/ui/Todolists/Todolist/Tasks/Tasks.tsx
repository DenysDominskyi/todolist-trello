import List from "@mui/material/List"
import { useEffect } from "react"
import { TaskStatus } from "common/enums"
import { useAppDispatch, useAppSelector } from "common/hooks"
// import { fetchTasksTC, selectTasks } from "../../../../model/tasksSlice"
import { DomainTodolist } from "../../../../model/todolistsSlice"
import { Task } from "./Task/Task"
import { useGetTasksQuery } from "features/todolists/api/tasksApi"

type Props = {
  todolist: DomainTodolist
}

export const Tasks = ({ todolist }: Props) => {
  // const tasks = useAppSelector(selectTasks)
  const {data} = useGetTasksQuery(todolist.id)

  const dispatch = useAppDispatch()

  // useEffect(() => {
  //   dispatch(fetchTasksTC(todolist.id))
  // }, [])

  let tasksForTodolist = data?.items

  if (todolist.filter === "active") {
    tasksForTodolist = tasksForTodolist?.filter((task) => task.status === TaskStatus.New)
  }

  if (todolist.filter === "completed") {
    tasksForTodolist = tasksForTodolist?.filter((task) => task.status === TaskStatus.Completed)
  }

  return (
    <>
      {tasksForTodolist?.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {tasksForTodolist?.map((task) => {
            return <Task key={task.id} task={task} todolist={todolist} />
          })}
        </List>
      )}
    </>
  )
}
