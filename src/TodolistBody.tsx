import { Button } from './Button'
import { FilterType } from './App'
import { TaskType } from './Todolist'
import { ChangeEvent } from 'react'
import { AddItemForm } from './AddItemForm'
import { EditableSpan } from './EditableSpan'

type TodolistBodyPropsType = {
    tasks: Array<TaskType>
    filter: FilterType
    todolistId: string

    changeTodolistFilter: (value: FilterType, todolistId: string) => void
    addTask: (title: string, listTaskId: string) => void
    removeTask: (id: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, newStatus: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
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


    const buttonsData = [
        {
            title: "All",
            onClickHandler: setFilterHandlerCreator('all'),
            classes: filter === 'all' ? 'filter-btn-active' : ''
        },
        {
            title: "Active",
            onClickHandler: setFilterHandlerCreator('active'),
            classes: filter === 'active' ? 'filter-btn-active' : ''
        },
        {
            title: "Completed",
            onClickHandler: setFilterHandlerCreator('completed'),
            classes: filter === 'completed' ? 'filter-btn-active' : ''
        },
    ]

    const filterButtons: Array<JSX.Element> = buttonsData.map(btn => {
        return (
            <Button
                key={btn.title}
                title={btn.title}
                styledClass={btn.classes}
                onClickHandler={btn.onClickHandler}
            />
        )
    })

    const tasksList: Array<JSX.Element> = tasks.map((task: TaskType) => {
        const onClickRemoveHandler = () => removeTask(task.id, todolistId)

        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            changeTaskStatus(task.id, e.currentTarget.checked, todolistId)
        }

        const setTaskNewTitle = (newTitle: string) => changeTaskTitle(task.id, newTitle, todolistId)

        const tasksClasses: string = task.isDone ? 'is-done' : 'task'

        return <li key={task.id} className={tasksClasses}>
            <input
                type="checkbox"
                checked={task.isDone}
                onChange={onChangeHandler}
            />
            <EditableSpan title={task.title} changeItemTitle={setTaskNewTitle}/>
            <Button title='x' onClickHandler={onClickRemoveHandler} />
        </li>
    })

    // handlers
    function setFilterHandlerCreator(newFilterValue: FilterType) {
        return () => changeTodolistFilter(newFilterValue, todolistId)
    }
    function addTaskHandler(newTaskTitle: string) {
        addTask(newTaskTitle, todolistId)
    }

    return (
        <>
            <AddItemForm maxTitleLength={10} addItem={addTaskHandler} />
            <ul>
                {tasksList}
            </ul>
            <div>
                {filterButtons}
            </div>
        </>
    )
}
