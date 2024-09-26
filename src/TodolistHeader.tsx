import React from 'react'
import { EditableSpan } from './EditableSpan'

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
            <button onClick={props.removeTodolist}>x</button>
            <input
                type="checkbox"
                onChange={props.toggleCollapsed}
                checked={props.isCollapsed}
            />
        </h3>
    )
}
