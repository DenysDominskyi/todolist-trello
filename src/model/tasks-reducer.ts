import { v1 } from "uuid";
import { TasksStateType } from "../App";
import { TaskType } from "../Todolist";

type AddTaskActionType = ReturnType<typeof addTaskAC>
type RemoveTaskACType = ReturnType<typeof removeTaskAC>
type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
type AddTasksArrayACType = ReturnType<typeof addTasksArrayAC>
type RemoveTasksArrayACType = ReturnType<typeof removeTasksArrayAC>

type TasksReducerActionsType =
    | RemoveTaskACType
    | ChangeTaskStatusACType
    | ChangeTaskTitleACType
    | AddTasksArrayACType
    | AddTaskActionType
    | RemoveTasksArrayACType

export const tasksReducer = (state: TasksStateType, action: TasksReducerActionsType): TasksStateType => {
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
        case 'ADD_TASKS': {

            return { ...state, [action.payload.id]: [] }
        }
        case 'REMOVE_TASKS': {
            delete state[action.payload.id]
            return { ...state }
        }
        default: {
            return state
        }
    }
}

export const addTaskAC = (id: string, title: string) => {
    return {
        type: 'ADD_TASK',
        payload: {
            id,
            title
        }
    } as const
}

export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: 'REMOVE_TASK',
        payload: {
            taskId,
            todolistId
        }
    } as const
}

export const changeTaskStatusAC = (todolistId: string, taskId: string, status: boolean) => {
    return {
        type: 'CHANGE_TASK_STATUS',
        payload: {
            todolistId,
            taskId,
            status,
        }
    } as const
}

export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string) => {
    return {
        type: 'CHANGE_TASK_TITLE',
        payload: {
            todolistId,
            taskId,
            title,
        }
    } as const
}

export const addTasksArrayAC = (id: string) => {
    return {
        type: 'ADD_TASKS',
        payload: {
            id
        }
    } as const
}

export const removeTasksArrayAC = (id: string) => {
    return {
        type: 'REMOVE_TASKS',
        payload: {
            id
        }
    } as const
}