import {AddItemForm} from "../../../../../common/components/AddItemForm/AddItemForm";
import {TodolistType} from "../../../../../app/App";
import { TodolistTitle } from "./TodolistTitle/TodolistTitle";
import { FilterTasksButtons } from "./FilterTasksButton/FilterTasksButtons";
import { Tasks } from "./Tasks/Tasks";

type PropsType = {
	todolist: TodolistType
	addTask: (title: string, todolistId: string) => void
}

export const Todolist = ({todolist,	addTask}: PropsType) => {
	
	const addTaskCallback = (title: string) => {
		addTask(title, todolist.id)
	}
	

	return (
		<div>
			<TodolistTitle todolist={todolist}/>
			<AddItemForm addItem={addTaskCallback}/>
			<Tasks todolist={todolist}/>
			<FilterTasksButtons todolist={todolist}/>
		</div>
	)
}
