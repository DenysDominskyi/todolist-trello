import { v1 } from "uuid";
import { FilterValuesType, TodolistType } from "../App";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    payload: {
        id: string
    }
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    payload: {
        id: string
        title: string
    }
}

export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    payload: {
        id: string
        title: string
    }
}

export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    payload: {
        id: string
        filter: FilterValuesType
    }
}

type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

const listTaskId1 = v1()
const listTaskId2 = v1()

const initialState: Array<TodolistType> = [
    { id: listTaskId1, title: 'What to learn', filter: 'active' },
    { id: listTaskId2, title: 'What to buy', filter: 'completed' },
]

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
            return [...state, newTodo]
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
            throw new Error("I don't understand this type")
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

export const addTodolistAC = (id: string, title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            title,
            id,
        },
    } as const
}

export const changeTodolistTitleAC = (id: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            id,
            title,
        },
    } as const
}

export const changeTodolistFilterAC = (id: string, filter: FilterValuesType ) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
          id: id,
          filter,
        },
      } as const
}