import { v1 } from "uuid"
import { TasksStateType } from "../App"
import { addTaskAC, addTasksArrayAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, removeTasksArrayAC, tasksReducer } from "./tasks-reducer"

// 1. State
let startState: TasksStateType

const listTaskId1 = v1()
const listTaskId2 = v1()

const taskId1 = v1()
const newTasksId = v1()

beforeEach(()=>{
    startState = {
        [listTaskId1]: [
            { id: v1(), title: "CSS", isDone: true },
            { id: v1(), title: "JS/TS", isDone: true },
            { id: v1(), title: "React", isDone: false },
            { id: v1(), title: "Redux", isDone: false },
        ],
        [listTaskId2]: [
            { id: v1(), title: "milk", isDone: true },
            { id: taskId1, title: "fruit", isDone: false },
        ]
    }
})

// 2.Tests
test('task should be added', () => {
    const endState = tasksReducer(startState, addTaskAC(listTaskId2, 'New task'))

    expect(endState[listTaskId1].length).toBe(4)
    expect(endState[listTaskId2].length).toBe(3)
    expect(endState[listTaskId2][0].title).toBe('New task')
})

test('correct task should be removed', () => {
    const endState = tasksReducer(startState, removeTaskAC(listTaskId2, taskId1))

    expect(endState[listTaskId1].length).toBe(4)
    expect(endState[listTaskId2].length).toBe(1)
    expect(endState[listTaskId2][0].title).toBe('milk')
})

test('correct task status should be changed', () => {
    const endState = tasksReducer(startState, changeTaskStatusAC(listTaskId2, taskId1, true))

    expect(endState[listTaskId2].length).toBe(2)
    expect(endState[listTaskId2][0].isDone).toBe(true)
    expect(endState[listTaskId2][1].isDone).toBe(true)
})

test('correct task title should be changed', () => {
    const endState = tasksReducer(startState, changeTaskTitleAC(listTaskId2, taskId1, 'New title'))

    expect(endState[listTaskId2].length).toBe(2)
    expect(endState[listTaskId2][0].title).toBe('milk')
    expect(endState[listTaskId2][1].title).toBe('New title')
})

test('tasks array should be added', () => {
    const endState = tasksReducer(startState, addTasksArrayAC(newTasksId))
    const lenghtEndState = Object.keys(endState).flat().length

    expect(lenghtEndState).toBe(3)
})
test('correct tasks array should be deleted', () => {
    const endState = tasksReducer(startState, removeTasksArrayAC(listTaskId2))
    const lenghtEndState = Object.keys(endState).flat().length

    expect(lenghtEndState).toBe(1)
})