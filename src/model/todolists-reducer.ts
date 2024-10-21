import { v1 } from "uuid";
import { FilterValuesType, TodolistType } from "../app/App";

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>

type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

const initialState: Array<TodolistType> = []

export const todolistsReducer = (state = initialState, action: ActionsType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return [...state.filter(tl => tl.id !== action.payload.id)]
        }
        case 'ADD-TODOLIST': {
            const newTodo: TodolistType = {
                id: action.payload.id,
                title: action.payload.title,
                filter: 'all'
            }
            return [newTodo, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const { id, title } = action.payload
            return [...state.map(tl => tl.id === id ? { ...tl, title } : tl)]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const { id, filter } = action.payload
            return [...state.map(tl => tl.id === id ? { ...tl, filter } : tl)]
        }
        default:
            return state
    }
}

export const removeTodolistAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            id
        },
    } as const
}

export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            title,
            id: v1()
        },
    } as const
}

export const changeTodolistTitleAC = (payload: {id: string, title: string}) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload
    } as const
}

export const changeTodolistFilterAC = (payload: {id: string, filter: FilterValuesType}) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload
      } as const
}