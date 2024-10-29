import DeleteIcon from '@mui/icons-material/Delete';
import { Checkbox, IconButton, ListItem } from '@mui/material';
import { ChangeEvent } from 'react';
import { EditableSpan } from '../../../../../../../common/components/EditableSpan/EditableSpan';
import { TaskType } from '../../../../../../../app/App';
import { useAppDispatch } from "../../../../../../../common/hooks/useAppDispatch";
import { changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from '../../../../../model/tasks-reducer';
import { getListItemSx } from "./Task.styles";

type Props = {
    task: TaskType
    todolistId: string
}

export const Task = ({task, todolistId}: Props) => {
    const dispatch = useAppDispatch()

    const removeTaskHandler = () => {
        dispatch(removeTaskAC({ taskId: task.id, todolistId }))
    }

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newStatusValue = e.currentTarget.checked
        dispatch(changeTaskStatusAC({ taskId: task.id, isDone: newStatusValue, todolistId }))
    }

    const changeTaskTitleHandler = (title: string) => {
        dispatch(changeTaskTitleAC({ taskId: task.id, title, todolistId }))
    }

    return (
        <ListItem sx={getListItemSx(task.isDone)}>
            <div>
                <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler} />
                <EditableSpan title={task.title} changeItemTitle={changeTaskTitleHandler} />
            </div>
            <IconButton onClick={removeTaskHandler}>
                <DeleteIcon />
            </IconButton>
        </ListItem>
    )
}
