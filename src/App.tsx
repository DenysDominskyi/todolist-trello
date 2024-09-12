import React, { useState } from 'react';
import './App.css';
import { TaskType, Todolist } from './Todolist';
import { v1 } from 'uuid';

export type FilterType = 'all' | 'active' | 'completed'

function App() {
    // BLL

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "JS/TS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Redux", isDone: false},
    ])
    const [filter, setFilter] = useState<FilterType>('all')

    
    let filteredTasks: Array<TaskType> = tasks
    if(filter === 'active') {
        filteredTasks = tasks.filter(t => t.isDone === false)
    }
    if(filter === 'completed') {
        filteredTasks = tasks.filter(t => t.isDone === true)
    }

    function addTask (title: string) {
        let newTask = {id: v1(), title: title, isDone: false}
        setTasks([newTask, ...tasks])
    }
    function removeTask(id: string) {
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
                addTask={addTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
