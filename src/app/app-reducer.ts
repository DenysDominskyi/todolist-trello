
const initialState = {
    themeMode: 'light' as ThemeMode
}

export const appReducer = (state: InitialType = initialState, action: ActionsType): InitialType => {
    switch (action.type) {
        case 'CHANGE_THEME': {
            return {
                ...state,
                themeMode: action.payload.themeMode
            }
        }
        default:
            return state
    }
}

// Action creators
export const changeThemeAC = (themeMode: ThemeMode) => {
    return {
        type: 'CHANGE_THEME',
        payload: {
            themeMode
        }
    } as const
}

// types
type InitialType = typeof initialState

export type ThemeMode = 'dark' | 'light'

type ChangeTheme = ReturnType<typeof changeThemeAC>
type ActionsType = ChangeTheme