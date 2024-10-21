import './App.css';
import { useState } from 'react';
import { TaskType, Todolist } from '../Todolist';
import { AddItemForm } from '../AddItemForm';
import { AppBar, Box, Button, Container, createTheme, CssBaseline, Grid2, IconButton, Paper, Switch, ThemeProvider, Toolbar } from '@mui/material';
import { Menu } from '@mui/icons-material';
import { addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC } from '../model/todolists-reducer';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from '../model/tasks-reducer';
import { useAppDispatch, useAppSelector } from './hooks';

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [id: string]: Array<TaskType>
}

export function App() {
    // BLL
    const [isLightMode, setIsLightMode] = useState(true)
    
    const todoLists = useAppSelector(state => state.todolists)
    const tasks = useAppSelector(state => state.tasks)

    const dispatch = useAppDispatch()

    // todolist functions
    const addTodolist = (title: string) => {
        dispatch(addTodolistAC(title))
    }
    const removeTodolist = (todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
    }
    const changeTodolistFilter = (value: FilterValuesType, todolistId: string) => {
        dispatch(changeTodolistFilterAC({ id: todolistId, filter: value }))
    }
    const changeTodolistTitle = (newTitle: string, todolistId: string) => {
        dispatch(changeTodolistTitleAC({ id: todolistId, title: newTitle }))
    }

    // tasks functions
    function addTask(title: string, todolistId: string) {
        dispatch(addTaskAC({ id: todolistId, title }))
    }
    function removeTask(id: string, todolistId: string) {
        dispatch(removeTaskAC({ todolistId, taskId: id }))
    }
    function changeTaskStatus(taskId: string, newStatus: boolean, todolistId: string) {
        dispatch(changeTaskStatusAC({ todolistId, taskId, status: newStatus }))
    }
    function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
        dispatch(changeTaskTitleAC({ todolistId, taskId, title: newTitle }))
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
                            <Switch onChange={() => setIsLightMode(!isLightMode)} />
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