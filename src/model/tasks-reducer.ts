import { v1 } from "uuid";
import { TasksStateType } from "../app/App";
import { TaskType } from "../Todolist";
import { AddTodolistActionType, RemoveTodolistActionType } from "./todolists-reducer";

type AddTaskActionType = ReturnType<typeof addTaskAC>
type RemoveTaskACType = ReturnType<typeof removeTaskAC>
type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>

type TasksReducerActionsType =
    | AddTaskActionType
    | RemoveTaskACType
    | ChangeTaskStatusACType
    | ChangeTaskTitleACType
    | AddTodolistActionType
    | RemoveTodolistActionType

const initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: TasksReducerActionsType): TasksStateType => {
    switch (action.type) {
        case 'ADD_TASK': {
            const { id, title } = action.payload
            let newTask: TaskType = { id: v1(), title, isDone: false }
            return { ...state, [id]: [newTask, ...state[id]] }
        }
        case 'REMOVE_TASK': {
            const { taskId, todolistId } = action.payload
            return { ...state, [todolistId]: [...state[todolistId].filter(t => t.id !== taskId)] }
        }
        case 'CHANGE_TASK_STATUS': {
            const { todolistId, taskId, status } = action.payload
            return {
                ...state,
                [todolistId]: [
                    ...state[todolistId].map(t => t.id === taskId
                        ? { ...t, isDone: status }
                        : t)
                ]
            }
        }
        case 'CHANGE_TASK_TITLE': {
            const { todolistId, taskId, title } = action.payload
            return {
                ...state,
                [todolistId]: [
                    ...state[todolistId].map(t => t.id === taskId
                        ? { ...t, title }
                        : t)
                ]
            }
        }
        case 'ADD-TODOLIST': {
            return { ...state, [action.payload.id]: [] }
        }
        case 'REMOVE-TODOLIST': {
            const newState = {...state}
            delete newState[action.payload.id]
            return newState
        }
        default: {
            return state
        }
    }
}

export const addTaskAC = (payload: {id: string, title: string}) => {
    return {
        type: 'ADD_TASK',
        payload
    } as const
}

export const removeTaskAC = (payload: {todolistId: string, taskId: string}) => {
    return {
        type: 'REMOVE_TASK',
        payload
    } as const
}

export const changeTaskStatusAC = (payload: {todolistId: string, taskId: string, status: boolean}) => {
    return {
        type: 'CHANGE_TASK_STATUS',
        payload
    } as const
}

export const changeTaskTitleAC = (payload: {todolistId: string, taskId: string, title: string}) => {
    return {
        type: 'CHANGE_TASK_TITLE',
        payload
    } as const
}