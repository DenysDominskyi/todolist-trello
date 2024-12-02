import { AddTodolistActionType, RemoveTodolistActionType } from "./todolists-reducer"
import { AppDispatch, AppThunk } from "app/store"
import { tasksApi } from "../api/tasksApi"
import { DomainTask, UpdateTaskModel } from "../api/tasksApi.types"
import { setAppErrorAC, setAppStatusAC } from "app/app-reducer"
import { ResultCode } from "common/enums"
import { handleServerAppError, handleServerNetworkError } from "common/utils"

export type TasksStateType = {
  [key: string]: DomainTask[]
}

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionsType): TasksStateType => {
  switch (action.type) {
    case "REMOVE-TASK": {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].filter((t) => t.id !== action.payload.taskId),
      }
    }

    case "ADD-TASK": {
      const newTask: DomainTask = action.payload.task
      return { ...state, [newTask.todoListId]: [newTask, ...state[newTask.todoListId]] }
    }

    case "UPDATE-TASK": {
      return {
        ...state,
        [action.payload.task.todoListId]: state[action.payload.task.todoListId].map((t) =>
          t.id === action.payload.task.id ? action.payload.task : t,
        ),
      }
    }

    case "ADD-TODOLIST":
      return { ...state, [action.payload.todolist.id]: [] }

    case "REMOVE-TODOLIST": {
      let copyState = { ...state }
      delete copyState[action.payload.id]
      return copyState
    }

    case "SET-TASKS": {
      const stateCopy = { ...state }
      stateCopy[action.payload.todolistId] = action.payload.tasks
      return stateCopy
    }

    default:
      return state
  }
}

// Action creators
export const removeTaskAC = (payload: { taskId: string; todolistId: string }) => {
  return {
    type: "REMOVE-TASK",
    payload,
  } as const
}

export const addTaskAC = (payload: { task: DomainTask }) => {
  return {
    type: "ADD-TASK",
    payload,
  } as const
}

export const updateTaskAC = (payload: { task: DomainTask }) => {
  return {
    type: "UPDATE-TASK",
    payload,
  } as const
}

export const setTasksAC = (payload: { todolistId: string; tasks: DomainTask[] }) => {
  return {
    type: "SET-TASKS",
    payload,
  } as const
}

// Actions types
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type SetTasksActionType = ReturnType<typeof setTasksAC>
export type UpdateTaskActionType = ReturnType<typeof updateTaskAC>

export type TasksActionsType =
  | RemoveTaskActionType
  | AddTaskActionType
  | AddTodolistActionType
  | RemoveTodolistActionType
  | SetTasksActionType
  | UpdateTaskActionType

// Thunks
export const fetchTasksTC =
  (todolistId: string): AppThunk =>
  (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC("loading"))
    tasksApi.getTasks(todolistId).then((res) => {
      dispatch(setAppStatusAC("succeeded"))
      const tasks = res.data.items
      dispatch(setTasksAC({ tasks, todolistId }))
    })
  }

export const removeTaskTC =
  (args: { taskId: string; todolistId: string }): AppThunk =>
  (dispatch: AppDispatch) => {
    tasksApi.deleteTask(args).then(() => {
      dispatch(removeTaskAC(args))
    })
  }

export const addTaskTC =
  (args: { title: string; todolistId: string }): AppThunk =>
  (dispatch: AppDispatch) => {
    dispatch(setAppStatusAC("loading"))
    tasksApi
      .createTask(args)
      .then((res) => {
        if (res.data.resultCode === ResultCode.success) {
          dispatch(setAppStatusAC("succeeded"))
          dispatch(addTaskAC({ task: res.data.data.item }))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch((err) => {
        handleServerNetworkError(err, dispatch)
      })
  }

export const updateTaskTC =
  (task: DomainTask): AppThunk =>
  (dispatch: AppDispatch) => {
    const model: UpdateTaskModel = {
      status: task.status,
      title: task.title,
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
    }
    dispatch(setAppStatusAC("loading"))
    tasksApi
      .updateTask({ todolistId: task.todoListId, taskId: task.id, model })
      .then((res) => {
        if (res.data.resultCode === ResultCode.success) {
          dispatch(setAppStatusAC("succeeded"))
          dispatch(updateTaskAC({ task: res.data.data.item }))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch((err) => {
        handleServerNetworkError(err, dispatch)
      })
  }
