import { applyMiddleware, combineReducers, legacy_createStore, UnknownAction } from "redux"
import { TasksActionsType, tasksReducer } from "../features/todolists/model/tasks-reducer"
import { TodolistsActionsType, todolistsReducer } from "../features/todolists/model/todolists-reducer"
import { appReducer } from "./app-reducer"
import { thunk, ThunkAction, ThunkDispatch } from "redux-thunk"

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer,
})

export const store = legacy_createStore(rootReducer, {}, applyMiddleware(thunk))

export type RootState = ReturnType<typeof store.getState>

export type AppActionsType = TodolistsActionsType | TasksActionsType

export type AppDispatch = ThunkDispatch<RootState, unknown, UnknownAction>

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AppActionsType>

// @ts-ignore
window.store = store
