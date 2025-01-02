import { Box, Button } from '@mui/material'
import { filterButtonsContainerSx } from "./FilterTasksButton.styles"
import { useAppDispatch } from "../../../../../../common/hooks/useAppDispatch"
import { changeTodolistFilter, DomainTodolist, FilterValuesType } from '../../../../model/todolistsSlice'

type Props = {
    todolist: DomainTodolist
}

export const FilterTasksButtons = ({ todolist }: Props) => {
    const dispatch = useAppDispatch()

    const changeFilter = (filter: FilterValuesType) => {
        dispatch(changeTodolistFilter({ id: todolist.id, filter }))
    }

    return (
        <Box sx={filterButtonsContainerSx}>
            <Button
                variant={todolist.filter === 'all' ? 'outlined' : 'text'}
                color={'inherit'}
                onClick={() => changeFilter('all')}>
                All
            </Button>
            <Button
                variant={todolist.filter === 'active' ? 'outlined' : 'text'}
                color={'primary'}
                onClick={() => changeFilter('active')}>
                Active
            </Button>
            <Button
                variant={todolist.filter === 'completed' ? 'outlined' : 'text'}
                color={'secondary'}
                onClick={() => changeFilter('completed')}>
                Completed
            </Button>
        </Box>
    )
}
