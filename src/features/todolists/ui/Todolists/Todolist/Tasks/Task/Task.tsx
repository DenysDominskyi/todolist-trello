import DeleteIcon from "@mui/icons-material/Delete"
import Checkbox from "@mui/material/Checkbox"
import IconButton from "@mui/material/IconButton"
import ListItem from "@mui/material/ListItem"
import { ChangeEvent } from "react"
import { EditableSpan } from "common/components"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { removeTaskTC, updateTaskTC } from "../../../../../model/tasks-reducer"
import { getListItemSx } from "./Task.styles"
import { DomainTask } from "features/todolists/api/tasksApi.types"
import { DomainTodolist } from "features/todolists/model/todolists-reducer"
import { TaskStatus } from "common/enums"

type Props = {
  task: DomainTask
  todolist: DomainTodolist
}

export const Task = ({ task, todolist }: Props) => {
  const dispatch = useAppDispatch()

  const removeTaskHandler = () => {
    dispatch(removeTaskTC({taskId: task.id, todolistId: todolist.id}))
  }

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
    dispatch(updateTaskTC({...task, status}))
  }

  const changeTaskTitleHandler = (title: string) => {
    dispatch(updateTaskTC({ ...task, title}))
  }

  let isDisabled = todolist.entityStatus === 'loading'

  return (
    <ListItem key={task.id} sx={getListItemSx(task.status === TaskStatus.Completed)}>
      <div>
        <Checkbox checked={task.status === TaskStatus.Completed} onChange={changeTaskStatusHandler} disabled={isDisabled}/>
        <EditableSpan value={task.title} onChange={changeTaskTitleHandler} disabled={isDisabled}/>
      </div>
      <IconButton onClick={removeTaskHandler} disabled={isDisabled}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}
