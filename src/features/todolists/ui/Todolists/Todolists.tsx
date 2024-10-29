import { Grid2, Paper } from "@mui/material"
import { Todolist } from "./Todolist/Todolist"
import { useAppSelector } from "../../../../common/hooks/useAppSelector"
import { useAppDispatch } from "../../../../common/hooks/useAppDispatch"
import { addTaskAC } from "../../model/tasks-reducer"
import { selectTodolists } from "../../../../app/appSelectors"

export const Todolists = () => {
    const todolists = useAppSelector(selectTodolists)

    const dispatch = useAppDispatch()

    const addTask = (title: string, todolistId: string) => {
        dispatch(addTaskAC({ title, todolistId }))
    }

    return (
        <>
            {todolists.map((tl) => {

                return (
                    <Grid2 key={tl.id}>
                        <Paper sx={{ p: '0 20px 20px 20px' }}>
                            <Todolist todolist={tl} addTask={addTask} />
                        </Paper>
                    </Grid2>
                )
            })}
        </>
    )
}
