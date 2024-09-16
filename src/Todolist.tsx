import { ChangeEvent, KeyboardEvent, useState } from "react"
import { FilterType } from "./App"
import { Button } from "./Button"

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    filter: FilterType
    removeTask: (id: string) => void
    changeFilter: (value: FilterType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, newStatus: boolean) => void
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
        filter,
        removeTask,
        changeFilter,
        addTask,
        changeTaskStatus
    }: TodolistPropsType) => {

    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [inputError, setInputError] = useState<boolean>(false)

    let titleLength = newTaskTitle.length
    let lengthToLong = titleLength > 10
    let disableBtn = !newTaskTitle

    function onNewTitleChangeHandle(e: ChangeEvent<HTMLInputElement>) {
        setInputError(false)
        setNewTaskTitle(e.currentTarget.value)
    }
    function addTaskHandler() {
        const trimmedTitle = newTaskTitle.trim()
        if (!disableBtn && !lengthToLong && trimmedTitle) {
            addTask(trimmedTitle)
        } else {
            setInputError(true)
        }
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
                <input
                    value={newTaskTitle}
                    onChange={onNewTitleChangeHandle}
                    onKeyDown={onKeyPressHandler}
                    className={inputError ? 'input-error' : ''}
                />
                <Button disabled={disableBtn || (titleLength > 10)} title="+" onClickHandler={addTaskHandler} />
                {disableBtn && !inputError && <p style={{ color: "skyblue" }}>Title can't be empty</p>}
                {!disableBtn && !inputError && (titleLength <= 10) && <p style={{ color: 'darkgreen' }}>Maximum {10 - titleLength} characters</p>}
                {lengthToLong && <p style={{ color: 'darkred' }}>Title to long</p>}
                {inputError && <div style={{ color: 'red' }}>Title is required</div>}
            </div>
            <ul>
                {tasks.map((task: TaskType) => {
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        changeTaskStatus(task.id, e.currentTarget.checked)
                    }

                    return <li key={task.id}>
                        <input
                            type="checkbox"
                            checked={task.isDone}
                            onChange={onChangeHandler}
                        />
                        <span className={task.isDone ? 'is-done' : 'task'}>{task.title}</span>
                        <Button title='x' onClickHandler={() => removeTask(task.id)} />
                    </li>
                })
                }
            </ul>
            <div>
                <Button styledClass={filter === 'all' ? 'active-filter' : ''} title="All" onClickHandler={onAllClickHandler} />
                <Button styledClass={filter === 'active' ? 'active-filter' : ''} title="Active" onClickHandler={onActiveClickHandler} />
                <Button styledClass={filter === 'completed' ? 'active-filter' : ''} title="Completed" onClickHandler={onCompletedClickHandler} />
            </div>
        </div >
    )
}