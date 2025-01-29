import { EditableSpan } from "common/components"
import { TaskStatus } from "common/enums"
import { DomainTask, UpdateTaskModel } from "../../../../../api/tasksApi.types"
import { getListItemSx } from "./Task.styles"
import { ChangeEvent } from "react"


import ClearIcon from '@mui/icons-material/Clear';
import RemoveIcon from '@mui/icons-material/Remove';

import Checkbox from "@mui/material/Checkbox"
import IconButton from "@mui/material/IconButton"
import ListItem from "@mui/material/ListItem"
import { useDeleteTaskMutation, useUpdateTaskMutation } from "features/todolists/api/tasksApi"
import { DomainTodolist } from "features/todolists/api/todolistsApi"

type Props = {
  task: DomainTask
  todolist: DomainTodolist
}

export const Task = ({ task, todolist }: Props) => {

  const [deleteTask] = useDeleteTaskMutation()
  const [updateTask] = useUpdateTaskMutation()

  const removeTaskHandler = () => {
    deleteTask({ taskId: task.id, todolistId: todolist.id })
  }

  const createUpdateTaskModel = (overrides: Partial<UpdateTaskModel>): UpdateTaskModel => {
    return {
      status: task.status,
      title: task.title,
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      ...overrides,
    }
  }

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
    const model = createUpdateTaskModel({ status })
    updateTask({ todolistId: todolist.id, taskId: task.id, model })
  }

  const changeTaskTitleHandler = (title: string) => {
    const model = createUpdateTaskModel({ title })
    updateTask({ todolistId: todolist.id, taskId: task.id, model })
  }

  const disabled = todolist.entityStatus === "loading"

  return (
    <ListItem key={task.id} sx={getListItemSx(task.status === TaskStatus.Completed)}
    style={{fontWeight: 'bold', borderBottom: '1px solid gray'}}>
      <div>
        <Checkbox
          checked={task.status === TaskStatus.Completed}
          onChange={changeTaskStatusHandler}
          disabled={disabled}
        />
        <EditableSpan value={task.title} onChange={changeTaskTitleHandler} disabled={disabled} />
      </div>
      <IconButton onClick={removeTaskHandler} disabled={disabled}>
        <ClearIcon fontSize="small" color="primary"/>
      </IconButton>
    </ListItem>
  )
}
