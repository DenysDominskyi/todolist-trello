import CssBaseline from "@mui/material/CssBaseline";
import {ThemeProvider} from '@mui/material/styles';
import { useAppSelector } from "../common/hooks/useAppSelector";
import { getTheme } from '../common/theme/theme';
import { Header } from '../common/components/Header/Header';
import { Main } from './Main';
import { selectThemeMode } from "./appSelectors";

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistType = {
	id: string
	title: string
	filter: FilterValuesType
}

export type TasksStateType = {
	[key: string]: TaskType[]
}



function App() {

	const themeMode = useAppSelector(selectThemeMode)
	const theme = getTheme(themeMode)

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline/>
			<Header />
			<Main />
		</ThemeProvider>
	);
}

export default App;
