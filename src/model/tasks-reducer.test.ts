import { TasksStateType, TodolistType } from "../app/App"
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from "./tasks-reducer"
import { addTodolistAC, removeTodolistAC, todolistsReducer } from "./todolists-reducer"

// 1. State
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

// 2.Tests
test('task should be added', () => {
    const endState = tasksReducer(startState, addTaskAC({id: 'listTaskId2', title: 'New task'}))

    expect(endState.listTaskId1.length).toBe(4)
    expect(endState.listTaskId2.length).toBe(3)
    expect(endState.listTaskId2[0].id).toBeDefined()
    expect(endState.listTaskId2[0].title).toBe('New task')
})

test('correct task should be deleted from correct array', () => {
    const endState = tasksReducer(startState, removeTaskAC({todolistId: 'listTaskId2', taskId: '2'}))

    expect(endState['listTaskId1']).toHaveLength(4)
    expect(endState['listTaskId2']).toHaveLength(1)
    expect(endState['listTaskId2'][0].title).toBe('milk')
    expect(endState['listTaskId2'].every(t => t.id != '2')).toBeTruthy()
})

test('correct task status should be changed', () => {
    const endState = tasksReducer(startState, changeTaskStatusAC({todolistId: 'listTaskId2', taskId: '2', status: true}))

    expect(endState['listTaskId2']).toHaveLength(2)
    expect(endState['listTaskId2'][0].isDone).toBe(true)
    expect(endState['listTaskId2'][1].isDone).toBe(true)
})

test('correct task title should be changed', () => {
    const endState = tasksReducer(startState, changeTaskTitleAC({todolistId: 'listTaskId2', taskId: '2', title: 'New title'}))

    expect(endState['listTaskId2']).toHaveLength(2)
    expect(endState['listTaskId2'][0].title).toBe('milk')
    expect(endState['listTaskId2'][1].title).toBe('New title')
})

