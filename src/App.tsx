import './App.css';
import { useState } from 'react';
import { TaskType, Todolist } from './Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';
import { AppBar, Box, Button, Container, createTheme, CssBaseline, Grid2, IconButton, Paper, Switch, ThemeProvider, Toolbar } from '@mui/material';
import { Menu } from '@mui/icons-material';

export type FilterType = 'all' | 'active' | 'completed'

type TodolistType = {
    id: string
    title: string
    filter: FilterType
}

type TasksStateType = {
    [id: string]: Array<TaskType>
}

function App() {
    // BLL
    const [isLightMode, setIsLightMode] = useState(true)

    const listTaskId1 = v1()
    const listTaskId2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodolistType>>(
        [
            { id: listTaskId1, title: 'What to learn', filter: 'active' },
            { id: listTaskId2, title: 'What to buy', filter: 'completed' },
        ]
    )

    const [tasks, setTasks] = useState<TasksStateType>({
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
    function addTodolist(title: string) {
        const newTodo: TodolistType = {
            id: v1(),
            title: title,
            filter: 'all'
        }
        setTodoLists([...todoLists, newTodo])
        setTasks({ ...tasks, [newTodo.id]: [] })
    }
    function removeTodolist(todolistId: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== todolistId))
        delete tasks[todolistId]
        setTasks({ ...tasks })
    }
    function changeTodolistFilter(value: FilterType, todolistId: string) {
        const nextState: Array<TodolistType> =
            todoLists.map(tl => tl.id === todolistId ? { ...tl, filter: value } : tl)
        setTodoLists(nextState)
    }
    function changeTodolistTitle(newTitle: string, todolistId: string) {
        const nextState: Array<TodolistType> =
            todoLists.map(tl => tl.id === todolistId ? { ...tl, title: newTitle } : tl)
        setTodoLists(nextState)
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
    function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
        const nextState = {
            ...tasks,
            [todolistId]: tasks[todolistId].map(t => t.id === taskId ? { ...t, title: newTitle } : t)
        }
        setTasks(nextState)
    }
    
    const TodolistComponents: Array<JSX.Element> = todoLists.map((tl) => {
        let filteredTasks = tasks[tl.id]
        if (tl.filter === 'active') {
            filteredTasks = filteredTasks.filter(t => t.isDone === false)
        }
        if (tl.filter === 'completed') {
            filteredTasks = filteredTasks.filter(t => t.isDone === true)
        }

        return (
            <Grid2 key={tl.id}>
                <Paper sx={{ display: 'flex' }} elevation={3}>
                    <Todolist
                        todolistId={tl.id}
                        title={tl.title}
                        filter={tl.filter}
                        tasks={filteredTasks}
                        addTask={addTask}
                        removeTask={removeTask}
                        changeTaskStatus={changeTaskStatus}
                        changeTaskTitle={changeTaskTitle}
                        changeTodolistFilter={changeTodolistFilter}
                        removeTodolist={removeTodolist}
                        changeTodolistTitle={changeTodolistTitle}
                    />
                </Paper>
            </Grid2>
        )
    })

    // MUI customization
    const theme = createTheme({
        palette: {
            primary: {
                main: '#E0C2FF',
                light: '#F5EBFF',
                contrastText: '#47008F',
            },
            secondary: {
                main: '#FF5733',
            },
            mode: isLightMode ? 'light' : 'dark'
        },
    });

    // UI
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className="App">
                <AppBar position='static' color='secondary'>
                    <Toolbar sx={{ justifyContent: 'space-between' }}>
                        <IconButton color='inherit'>
                            <Menu />
                        </IconButton>
                        <Box>
                            <Switch onChange={()=>setIsLightMode(!isLightMode)}/>
                            <Button color='inherit'>Login</Button>
                        </Box>
                    </Toolbar>
                </AppBar>
                <Container fixed>
                    <Grid2
                        container
                        sx={{ mt: '15px' }}
                    >
                        <AddItemForm
                            addItem={addTodolist}
                            maxTitleLength={12}
                        />
                    </Grid2>
                    <Grid2 container spacing={2}>
                        {TodolistComponents}
                    </Grid2>
                </Container>
            </div>
        </ThemeProvider>
    );
}

export default App;