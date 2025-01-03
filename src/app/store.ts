import { UnknownAction } from "redux"
import { ThunkDispatch } from "redux-thunk"
import { tasksReducer, tasksSlise } from "../features/todolists/model/tasksSlice"
import { todolistSlice, todolistsReducer } from "../features/todolists/model/todolistsSlice"
import { appReducer, appSlice } from "./appSlice"
import { authReducer, authSlice } from "features/auth/model/authSlice"
import { configureStore } from "@reduxjs/toolkit"

// export const store = legacy_createStore(rootReducer, {}, applyMiddleware(thunk))
export const store = configureStore({ reducer: {
  [tasksSlise.name]: tasksReducer,
  [todolistSlice.name]: todolistsReducer,
  [appSlice.name]: appReducer,
  [authSlice.name]: authReducer,
}})

export type RootState = ReturnType<typeof store.getState>

// export type AppDispatch = typeof store.dispatch

// Создаем тип диспатча который принимает как AC так и TC
export type AppDispatch = ThunkDispatch<RootState, unknown, UnknownAction>

// @ts-ignore
window.store = store
