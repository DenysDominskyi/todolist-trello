import { TaskType } from './Todolist'
import { ChangeEvent } from 'react'
import { AddItemForm } from './AddItemForm'
import { EditableSpan } from './EditableSpan'
import { Button, Checkbox, IconButton, List, ListItem } from '@mui/material'
import { Backspace } from '@mui/icons-material'
import { FilterValuesType } from './App'

type TodolistBodyPropsType = {
    tasks: Array<TaskType>
    filter: FilterValuesType
    todolistId: string

    changeTodolistFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, listTaskId: string) => void
    removeTask: (id: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, newStatus: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

type ButtonsDataType = {
    title: string
    onClickHandler: () => void
    color: "inherit" | "primary" | "secondary"
}

export const TodolistBody = ({
    tasks,
    filter,
    todolistId,
    changeTodolistFilter,
    addTask,
    removeTask,
    changeTaskStatus,
    changeTaskTitle
}: TodolistBodyPropsType) => {

    const buttonsData: ButtonsDataType[] = [
        {
            title: "All",
            onClickHandler: setFilterHandlerCreator('all'),
            color: filter === 'all' ? 'secondary' : 'inherit'
        },
        {
            title: "Active",
            onClickHandler: setFilterHandlerCreator('active'),
            color: filter === 'active' ? 'secondary' : 'inherit'
        },
        {
            title: "Completed",
            onClickHandler: setFilterHandlerCreator('completed'),
            color: filter === 'completed' ? 'secondary' : 'inherit'
        },
    ]

    const filterButtons: Array<JSX.Element> = buttonsData.map(btn => {
        return (
            <Button
                key={btn.title}
                onClick={btn.onClickHandler}
                variant="contained"
                color={btn.color}
                size="small"
            >
                {btn.title}
            </Button>
        )
    })

    const tasksList: Array<JSX.Element> = tasks.map((task: TaskType) => {
        const onClickRemoveHandler = () => removeTask(task.id, todolistId)

        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            changeTaskStatus(task.id, e.currentTarget.checked, todolistId)
        }

        const setTaskNewTitle = (newTitle: string) => changeTaskTitle(task.id, newTitle, todolistId)

        const tasksClasses: string = task.isDone ? 'is-done' : 'task'

        return (
            <ListItem
                key={task.id}
                divider
                className={tasksClasses}
                disablePadding={true}
                secondaryAction={
                    <IconButton
                        onClick={onClickRemoveHandler}
                        color="secondary"
                        size="small"
                    >
                        <Backspace fontSize="inherit" />
                    </IconButton>
                }
            >
                <Checkbox
                    checked={task.isDone}
                    onChange={onChangeHandler}
                    color="secondary"
                    size='small'
                />
                <EditableSpan
                    title={task.title}
                    changeItemTitle={setTaskNewTitle}
                />

            </ListItem>
        )
    })

    // handlers
    function setFilterHandlerCreator(newFilterValue: FilterValuesType) {
        return () => changeTodolistFilter(newFilterValue, todolistId)
    }
    function addTaskHandler(newTaskTitle: string) {
        addTask(newTaskTitle, todolistId)
    }

    return (
        <>
            <AddItemForm maxTitleLength={10} addItem={addTaskHandler} />
            <List>
                {tasksList}
            </List>
            <div>
                {filterButtons}
            </div>
        </>
    )
}
