import { EditableSpan } from './EditableSpan'
import { IconButton, Switch } from '@mui/material'
import { DeleteForever } from '@mui/icons-material'

type TodolistHeaderPropsType = {
    title: string
    isCollapsed: boolean
    toggleCollapsed: () => void
    removeTodolist: () => void
    changeTodolistTitle: (newTitle: string) => void
}

export const TodolistHeader = (props: TodolistHeaderPropsType) => {
    return (
        <h3>
            <EditableSpan
                title={props.title}
                changeItemTitle={props.changeTodolistTitle}
            />
            <Switch
                onChange={props.toggleCollapsed}
                checked={!props.isCollapsed}
                size='small'
            />
            <IconButton
                onClick={props.removeTodolist}
                color="primary"
                size="medium"
            >
                <DeleteForever fontSize="inherit" />
            </IconButton>
        </h3>
    )
}
