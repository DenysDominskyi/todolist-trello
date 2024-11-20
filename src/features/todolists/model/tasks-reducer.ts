import { v1 } from "uuid"
import { AddTodolistActionType, RemoveTodolistActionType } from "./todolists-reducer"
import { AppDispatch, RootState } from "app/store"
import { tasksApi } from "../api/tasksApi"
import { DomainTask, UpdateTaskModel } from "../api/tasksApi.types"
import { TaskPriority, TaskStatus } from "common/enums"
import { todolistsApi } from "../api/todolistsApi"

export type TasksStateType = {
  [key: string]: DomainTask[]
}

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
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

    case "CHANGE_TASK_STATUS": {
      const task = action.payload.task

      return {
        ...state,
        [task.todoListId]: state[task.todoListId].map((t) =>
          t.id === task.id
            ? {
                ...t,
                status: task.status,
              }
            : t,
        ),
      }
    }

    case "CHANGE_TASK_TITLE": {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map((t) =>
          t.id === action.payload.taskId
            ? {
                ...t,
                title: action.payload.title,
              }
            : t,
        ),
      }
    }

    case "ADD-TODOLIST":
      return { ...state, [action.payload.todolistId]: [] }

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

export const changeTaskStatusAC = (payload: {task: DomainTask}) => {
  return {
    type: "CHANGE_TASK_STATUS",
    payload,
  } as const
}

export const changeTaskTitleAC = (payload: { taskId: string; title: string; todolistId: string }) => {
  return {
    type: "CHANGE_TASK_TITLE",
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
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
export type SetTasksActionType = ReturnType<typeof setTasksAC>

type ActionsType =
  | RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType
  | AddTodolistActionType
  | RemoveTodolistActionType
  | SetTasksActionType

//Thunks
export const fetchTasksTC = (todolistId: string) => (dispatch: AppDispatch) => {
  tasksApi.getTasks(todolistId).then((res) => {
    const tasks = res.data.items
    dispatch(setTasksAC({ tasks, todolistId }))
  })
}

export const removeTaskTC = (args: { taskId: string; todolistId: string }) => (dispatch: AppDispatch) => {
  tasksApi.deleteTask(args).then(() => {
    dispatch(removeTaskAC(args))
  })
}

export const addTaskTC = (args: { title: string; todolistId: string }) => (dispatch: AppDispatch) => {
  tasksApi.createTask(args).then((res) => {
    const newTask = res.data.data.item
    dispatch(addTaskAC({ task: newTask }))
  })
}

export const changeTaskStatusTC = (task: DomainTask) => (dispatch: AppDispatch) => {
  const model: UpdateTaskModel = {
    status: task.status,
    title: task.title,
    deadline: task.deadline,
    description: task.description,
    priority: task.priority,
    startDate: task.startDate,
  }
  tasksApi.updateTask({ taskId: task.id, model, todolistId: task.todoListId }).then((res) => {
    dispatch(changeTaskStatusAC({task: res.data.data.item}))
  })
}
