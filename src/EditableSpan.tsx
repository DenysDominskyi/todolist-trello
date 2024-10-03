import { TextField } from "@mui/material"
import { ChangeEvent, useState } from "react"


type EditableSpanPropsType = {
    title: string
    changeItemTitle: (newTitle: string) => void
}

export const EditableSpan = ({ title, changeItemTitle }: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState(false)
    const [inputValue, setInputValue] = useState(title)

    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        changeItemTitle(inputValue)
        setEditMode(false)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setInputValue(e.currentTarget.value)

    return (
        editMode
            ? <TextField
                value={inputValue}
                autoFocus
                onBlur={offEditMode}
                onChange={onChangeHandler}
                variant="standard"
            />
            : <span className="spn" onDoubleClick={onEditMode}>{title}</span>
    )
}
