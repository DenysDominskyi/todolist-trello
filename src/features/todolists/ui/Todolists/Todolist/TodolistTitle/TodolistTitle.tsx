import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import IconButton from "@mui/material/IconButton"
import { EditableSpan } from "common/components"
import s from "./TodolistTitle.module.css"
import {
  DomainTodolist,
  todolistsApi,
  useDeleteTodolistMutation,
  useUpdateTodolistTitleMutation,
} from "features/todolists/api/todolistsApi"
import { useAppDispatch } from "common/hooks"

type Props = {
  todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: Props) => {
  const { title, id, entityStatus } = todolist

  const [deleteTodolist] = useDeleteTodolistMutation()
  const [updateTodolistTitle] = useUpdateTodolistTitleMutation()
  const dispatch = useAppDispatch()

  const removeTodolistHandler = () => {
    dispatch(
      todolistsApi.util.updateQueryData("getTodolists", undefined, (state) => {
        const todolist = state.find((tl) => tl.id === id)
        if (todolist) {
          todolist.entityStatus = "loading"
        }
      }),
    )
    deleteTodolist(id)
  }
  const updateTodolistHandler = (title: string) => {
    updateTodolistTitle({ id, title })
  }

  return (
    <div className={s.container}>
      <h3>
        <EditableSpan value={title} onChange={updateTodolistHandler} disabled={entityStatus === "loading"} />
      </h3>
      <IconButton onClick={removeTodolistHandler} disabled={entityStatus === "loading"}>
        <DeleteOutlineIcon color="secondary"/>
      </IconButton>
    </div>
  )
}
