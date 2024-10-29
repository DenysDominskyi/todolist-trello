import { EditableSpan } from '../../../../../../common/components/EditableSpan/EditableSpan'
import { IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import { changeTodolistTitleAC, removeTodolistAC } from '../../../../model/todolists-reducer';
import { useAppDispatch } from "../../../../../../common/hooks/useAppDispatch";
import { TodolistType } from '../../../../../../app/App';
import styles from './TodolistTitle.module.css'

type Props = {
    todolist: TodolistType
}

export const TodolistTitle = ({todolist}: Props) => {
    const dispatch = useAppDispatch()

    const removeTodolist = () => {
        dispatch(removeTodolistAC(todolist.id))
    }
    
    const updateTodolist = (title: string) => {
        dispatch(changeTodolistTitleAC({ id: todolist.id, title }))
    }
    return (
        <div className={styles.container}>
            <h3><EditableSpan title={todolist.title} changeItemTitle={updateTodolist} /></h3>
            <IconButton onClick={removeTodolist}>
                <DeleteIcon />
            </IconButton>
        </div>
    )
}
