import { useState } from "react"
import { FilterValuesType } from "./app/App"
import { TodolistHeader } from "./TodolistHeader"
import { TodolistBody } from "./TodolistBody"
import { Box } from "@mui/material"
import { todolistSx } from "./todolist.styles"

type TodolistPropsType = {
    todolistId: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType

    addTask: (title: string, listTaskId: string) => void
    removeTask: (id: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, newStatus: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void

    removeTodolist: (todolistId: string) => void
    changeTodolistFilter: (value: FilterValuesType, todolistId: string) => void
    changeTodolistTitle: (newTitle: string, todolistId: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = (
    {
        todolistId,
        title,
        tasks,
        filter,

        addTask,
        removeTask,
        changeTaskStatus,
        changeTaskTitle,

        changeTodolistFilter,
        removeTodolist,
        changeTodolistTitle
    }: TodolistPropsType) => {

    const [collapsed, setCollapsed] = useState(false)

    const setTodolistNewTitle = (newTitle: string) => changeTodolistTitle(newTitle, todolistId)

    return (
        <Box sx={todolistSx}>
            <TodolistHeader
                title={title}
                isCollapsed={collapsed}
                toggleCollapsed={() => setCollapsed(!collapsed)}
                removeTodolist={() => removeTodolist(todolistId)}
                changeTodolistTitle={setTodolistNewTitle}
            />
            {!collapsed &&
                <TodolistBody
                    tasks={tasks}
                    filter={filter}
                    todolistId={todolistId}
                    addTask={addTask}
                    removeTask={removeTask}
                    changeTaskStatus={changeTaskStatus}
                    changeTaskTitle={changeTaskTitle}
                    changeTodolistFilter={changeTodolistFilter}
                />}
        </Box >

    )
}
