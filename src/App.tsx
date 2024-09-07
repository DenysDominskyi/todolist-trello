import React, { useState } from 'react';
import './App.css';
import { TaskType, Todolist } from './Todolist';

export type FilterType = 'all' | 'active' | 'completed'

function App() {
    // BLL

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: "CSS", isDone: true},
        {id: 2, title: "JS/TS", isDone: true},
        {id: 3, title: "React", isDone: false},
        {id: 4, title: "Redux", isDone: false},
    ])
    const [filter, setFilter] = useState<FilterType>('all')

    
    let filteredTasks: Array<TaskType> = tasks
    if(filter === 'active') {
        filteredTasks = tasks.filter(t => t.isDone === false)
    }
    if(filter === 'completed') {
        filteredTasks = tasks.filter(t => t.isDone === true)
    }

    function removeTask(id: number) {
        const filteredTasks = tasks.filter( t => t.id !== id)
        setTasks(filteredTasks)
    }

    const changeFilter = (value: FilterType) => setFilter(value)
    
    // UI
    return (
        <div className="App">
            <Todolist
                title='What to learn'
                tasks={filteredTasks}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
