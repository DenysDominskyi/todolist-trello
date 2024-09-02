import React, { useState } from 'react';
import './App.css';
import { TaskType, Todolist } from './Todolist';

export type FilterValuesType = 'all' | 'completed' | 'active'

function App() {
    // BLL

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: "CSS", isDone: true},
        {id: 2, title: "JS/TS", isDone: true},
        {id: 3, title: "React", isDone: false},
        {id: 4, title: "Redux", isDone: false},
    ])
    const [filter, setFilter] = useState<FilterValuesType>('all')

    function removeTask(id: number) {
        const filteredTasks = tasks.filter( t => t.id !== id)
        setTasks(filteredTasks)
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }

    let tasksForTodolist = tasks
    if(filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.isDone === true)
    }
    if(filter === 'active') {
        tasksForTodolist = tasks.filter(t => t.isDone === false)
    }

    // UI
    return (
        <div className="App">
            <Todolist
                title='What to learn'
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
                />
        </div>
    );
}

export default App;
