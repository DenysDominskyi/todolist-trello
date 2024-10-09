import { addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC, todolistsReducer } from './todolists-reducer'
import { v1 } from 'uuid'
import { TodolistType } from '../App'

// 1. State
let todolistId1 = v1()
let todolistId2 = v1()

let startState: TodolistType[]

beforeEach(() => {
    startState = [
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' },
    ]
})

test('correct todolist should be removed', () => {
    // 2. Действие

    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    // 3. Проверяем, что наши действия (изменения state) соответствуют ожиданию
    // в массиве останется один тудулист
    expect(endState.length).toBe(1)
    // удалится нужный тудулист, а не любой
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
    const newId = v1()
    const endState = todolistsReducer(startState, addTodolistAC(newId, 'New todolist'))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe('New todolist')
    expect(endState[2].id).toBe(newId)
})

test('correct todolist should change its name', () => {

    const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId2, 'New title'))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe('New title')
})

test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: TodolistType[] = [
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' },
    ]

    const endState = todolistsReducer(startState, changeTodolistFilterAC(todolistId2, 'completed'))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe('completed')
})