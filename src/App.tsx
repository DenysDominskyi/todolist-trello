import './App.css';
import { useReducer, useState } from 'react';
import { TaskType, Todolist } from './Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';
import { AppBar, Box, Button, Container, createTheme, CssBaseline, Grid2, IconButton, Paper, Switch, ThemeProvider, Toolbar } from '@mui/material';
import { Menu } from '@mui/icons-material';
import { addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC, todolistsReducer } from './model/todolists-reducer';
import { addTaskAC, addTasksArrayAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, removeTasksArrayAC, tasksReducer } from './model/tasks-reducer';

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [id: string]: Array<TaskType>
}

function App() {
    // BLL
    const [isLightMode, setIsLightMode] = useState(true)

    const listTaskId1 = v1()
    const listTaskId2 = v1()

    const [todoLists, dispatchTodolists] = useReducer(todolistsReducer,
        [
            { id: listTaskId1, title: 'What to learn', filter: 'active' },
            { id: listTaskId2, title: 'What to buy', filter: 'completed' },
        ]
    )

    const [tasks, dispatchTasks] = useReducer( tasksReducer,{
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
    const addTodolist = (title: string) => {
        const newId = v1()
        dispatchTodolists(addTodolistAC(newId, title))
        dispatchTasks(addTasksArrayAC(newId))
    }
    const removeTodolist = (todolistId: string) => {
        dispatchTodolists(removeTodolistAC(todolistId))
        dispatchTasks(removeTasksArrayAC(todolistId))
    }
    const changeTodolistFilter = (value: FilterValuesType, todolistId: string) => {
        dispatchTodolists(changeTodolistFilterAC(todolistId, value))
    }
    const changeTodolistTitle = (newTitle: string, todolistId: string) => {
        dispatchTodolists(changeTodolistTitleAC(todolistId, newTitle))
    }

    // tasks functions
    function addTask(title: string, todolistId: string) {
        dispatchTasks(addTaskAC(todolistId, title))
    }
    function removeTask(id: string, todolistId: string) {
        dispatchTasks(removeTaskAC(todolistId, id))
    }
    function changeTaskStatus(taskId: string, newStatus: boolean, todolistId: string) {
        dispatchTasks(changeTaskStatusAC(todolistId, taskId, newStatus))
    }
    function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
        dispatchTasks(changeTaskTitleAC(todolistId, taskId, newTitle))
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