import {ChangeEvent, useState} from "react";
import TextField from "@mui/material/TextField";

type PropsType = {
	title: string
	changeItemTitle: (newTitle: string) => void
};

export const EditableSpan = ({title, changeItemTitle}: PropsType) => {
	const [editMode, setEditMode] = useState(false)
	const [newTitle, setTitle] = useState(title)

	const activateEditModeHandler = () => {
		setEditMode(true)
	}

	const deactivateEditModeHandler = () => {
		setEditMode(false)
		changeItemTitle(title)
	}

	const changeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
		setTitle(event.currentTarget.value)
	}

	return (
		<>
			{editMode
				?
				<TextField
					variant={'outlined'}
					value={newTitle}
					size={'small'}
					onChange={changeTitleHandler}
					onBlur={deactivateEditModeHandler}
					autoFocus
				/>
				: <span onDoubleClick={activateEditModeHandler}>{newTitle}</span>
			}
		</>
	);
};
