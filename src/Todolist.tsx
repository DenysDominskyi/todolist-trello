import { ChangeEvent, KeyboardEvent, useState } from "react"
import { FilterType } from "./App"
import { Button } from "./Button"

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterType) => void
    addTask: (title: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = (
    {
        title,
        tasks,
        removeTask,
        changeFilter,
        addTask
    }: TodolistPropsType) => {

    const [newTaskTitle, setNewTaskTitle] = useState('')

    let titleLength = newTaskTitle.length
    let lengthToLong = titleLength > 10
    let disableBtn = !newTaskTitle

    function onNewTitleChangeHandle(e: ChangeEvent<HTMLInputElement>) {
        setNewTaskTitle(e.currentTarget.value)
    }
    function addTaskHandler() {
        addTask(newTaskTitle)
        setNewTaskTitle('')
    }
    function onKeyPressHandler(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter' && !lengthToLong && !disableBtn) {
            addTask(newTaskTitle)
            setNewTaskTitle('')
        }
    }
    function onAllClickHandler() {
        changeFilter('all')
    }
    function onActiveClickHandler() {
        changeFilter('active')
    }
    function onCompletedClickHandler() {
        changeFilter('completed')
    }

    return (
        <div className='todolist'>
            <h3>{title}</h3>
            <div>
                {disableBtn && <p style={{ color: "skyblue" }}>Title can't be empty</p>}
                {!disableBtn && (titleLength <= 10) && <p style={{ color: 'darkgreen' }}>Maximum {10 - titleLength} characters</p>}
                {lengthToLong && <p style={{ color: 'darkred' }}>Title to long</p>}
                <input
                    value={newTaskTitle}
                    onChange={onNewTitleChangeHandle}
                    onKeyDown={onKeyPressHandler}
                />
                <Button disabled={disableBtn || (titleLength > 10)} title="+" onClickHandler={addTaskHandler} />
            </div>
            <ul>
                {tasks.map((task: TaskType) => (
                    <li key={task.id}>
                        <input type="checkbox" checked={task.isDone} />
                        <span>{task.title}</span>
                        <Button title='x' onClickHandler={() => removeTask(task.id)} />
                    </li>
                ))
                }
            </ul>
            <div>
                <Button title="All" onClickHandler={onAllClickHandler} />
                <Button title="Active" onClickHandler={onActiveClickHandler} />
                <Button title="Completed" onClickHandler={onCompletedClickHandler} />
            </div>
        </div>
    )
}