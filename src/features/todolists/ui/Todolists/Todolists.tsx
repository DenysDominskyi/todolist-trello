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
            <Paper
              sx={{
                p: "0 20px 20px 20px",
                backgroundImage:
                  "linear-gradient(115deg, rgba(90, 134, 140, 0.08), rgba(157, 226, 227, 0.08), rgba(118, 89, 176, 0.1))",
              }}
            >
              <Todolist key={tl.id} todolist={tl} />
            </Paper>
          </Grid>
        )
      })}
    </>
  )
}
