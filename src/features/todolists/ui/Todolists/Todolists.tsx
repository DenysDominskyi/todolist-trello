import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Unstable_Grid2"
import { Todolist } from "./Todolist/Todolist"
import { useGetTodolistsQuery } from "features/todolists/api/todolistsApi"
import { TodolistSkeleton } from "../skeletons/TodolistSkeleton/TodolistSkeleton"

export const Todolists = () => {
  const { data: todolists, isFetching, isLoading } = useGetTodolistsQuery()

  if (isLoading) {
    return <TodolistSkeleton />
  }

  return (
    <>
      {todolists?.map((tl) => {
        return (
          <Grid key={tl.id}>
            <Paper sx={{ p: "0 20px 20px 20px" }}>
              <Todolist key={tl.id} todolist={tl} />
            </Paper>
          </Grid>
        )
      })}
    </>
  )
}
