import React, { useState } from 'react';
import './App.css';
import { TaskType, Todolist } from './Todolist';
import { v1 } from 'uuid';

export type FilterType = 'all' | 'active' | 'completed'

type ListsType = Array<{
    id: string
    title: string
    filter: FilterType
}>

type TasksStateType = {
    [id: string]: Array<TaskType>
}

function App() {
    // BLL
    const listTaskId1 = v1()
    const listTaskId2 = v1()

    const [todoLists, setTodoLists] = useState<ListsType>([
        { id: listTaskId1, title: 'What to learn', filter: 'active' },
        { id: listTaskId2, title: 'What to buy', filter: 'completed' },
    ])

    const [tasks, setTasks] = useState({
        [listTaskId1]: [
            { id: v1(), title: "CSS", isDone: true },
            { id: v1(), title: "JS/TS", isDone: true },
            { id: v1(), title: "React", isDone: false },
            { id: v1(), title: "Redux", isDone: false },
        ],
        [listTaskId2]: [
            { id: v1(), title: "milk", isDone: true },
            { id: v1(), title: "fruit", isDone: false },
        ]
    })
    // todolist functions
    function removeTodolist(todolistId: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== todolistId))
        delete tasks[todolistId]
        setTasks({ ...tasks })
    }
    function changeTodolistFilter (value: FilterType, todolistId: string) {
        let todolist = todoLists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodoLists([...todoLists])
        }
    }

    // tasks functions
    function addTask(title: string, todolistId: string) {
        let newTask: TaskType = { id: v1(), title: title, isDone: false }
        // const newState: TasksStateType = {...tasks, [todolistId]: [newTask, ...tasks[todolistId]]}
        setTasks({ ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] })
    }
    function removeTask(id: string, todolistId: string) {
        // const newState: TasksStateType = {...tasks, [todolistId]: [ ...tasks[todolistId].filter(t => t.id !== id)]}
        setTasks({ ...tasks, [todolistId]: [...tasks[todolistId].filter(t => t.id !== id)] })
    }
    function changeTaskStatus(taskId: string, newStatus: boolean, todolistId: string) {
        const nextState = {
            ...tasks,
            [todolistId]: tasks[todolistId].map(t => t.id === taskId ? { ...t, isDone: newStatus } : t)
        }
        setTasks(nextState)
    }


    // UI
    return (
        <div className="App">
            {todoLists.map((tl) => {

                let filteredTasks = tasks[tl.id]
                if (tl.filter === 'active') {
                    filteredTasks = filteredTasks.filter(t => t.isDone === false)
                }
                if (tl.filter === 'completed') {
                    filteredTasks = filteredTasks.filter(t => t.isDone === true)
                }

                return (
                    <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        filter={tl.filter}
                        tasks={filteredTasks}
                        addTask={addTask}
                        removeTask={removeTask}
                        changeTaskStatus={changeTaskStatus}
                        changeTodolistFilter={changeTodolistFilter}
                        removeTodolist={removeTodolist}
                    />
                )
            })}
        </div>
    );
}

export default App;
