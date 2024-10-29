import { TasksStateType, TodolistType } from "../../../../app/App"
import { tasksReducer } from "../tasks-reducer"
import { addTodolistAC, removeTodolistAC, todolistsReducer } from "../todolists-reducer"

let startState: TasksStateType

beforeEach(() => {
    startState = {
        'listTaskId1': [
            { id: '1', title: "CSS", isDone: true },
            { id: '2', title: "JS/TS", isDone: true },
            { id: '3', title: "React", isDone: false },
            { id: '4', title: "Redux", isDone: false },
        ],
        'listTaskId2': [
            { id: '1', title: "milk", isDone: true },
            { id: '2', title: "fruit", isDone: false },
        ]
    }
})

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistState: Array<TodolistType> = []

    const action = addTodolistAC('new todolist')
    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistState = todolistsReducer(startTodolistState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistState[0].id

    expect(idFromTasks).toBe(action.payload.todolistId)
    expect(idFromTodolists).toBe(action.payload.todolistId)
})

test('correct tasks array should be deleted', () => {
    const endState = tasksReducer(startState, removeTodolistAC('listTaskId2'))
    const lenghtEndState = Object.keys(endState).flat().length

    expect(lenghtEndState).toBe(1)
    expect(endState['listTaskId2']).toBeUndefined()
})