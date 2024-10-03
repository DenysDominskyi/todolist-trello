import { IconButton, TextField} from '@mui/material'
import { ChangeEvent, KeyboardEvent, useState } from 'react'
import { AddBox } from '@mui/icons-material'

type AddItemFormPropsType = {
    maxTitleLength: number
    addItem: (title: string) => void
}

export const AddItemForm = ({
    maxTitleLength,
    addItem,
}: AddItemFormPropsType) => {
    // local states
    const [inputError, setInputError] = useState(false)
    const [titleInputValue, setTitleInputValue] = useState('')

    function addItemHandler() {
        const trimmedTitle = titleInputValue.trim()
        if (!isInputBtnDisabled && !userErrorLengthMessage && trimmedTitle) {
            addItem(trimmedTitle)
        } else {
            setInputError(true)
        }
        setTitleInputValue('')
    }
    function onKeyPressHandler(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter' && !userErrorLengthMessage && !isInputBtnDisabled) {
            addItem(titleInputValue)
            setTitleInputValue('')
        }
    }
    function onNewTitleChangeHandle(e: ChangeEvent<HTMLInputElement>) {
        setInputError(false)
        setTitleInputValue(e.currentTarget.value)
    }


    // local variables
    const isInputBtnDisabled = !titleInputValue
    const userLengthMessage = `There are ${maxTitleLength - titleInputValue.length} characters left to enter`
    const userErrorLengthMessage = titleInputValue.length > maxTitleLength


    let makeHelperText = () => {
        let myText = ''
        if (isInputBtnDisabled && !inputError) {
            myText = `Max length task title is ${maxTitleLength} symbols`
        }
        if (!isInputBtnDisabled && !inputError && !userErrorLengthMessage) {
            myText = userLengthMessage
        }
        if (userErrorLengthMessage) {
            myText = 'Title to long'
        }
        if (inputError) {
            myText = 'Title is required'
        }
        return myText
    }
    return (
        <div>
            <TextField
                variant="outlined"
                size='small'
                value={titleInputValue}
                onChange={onNewTitleChangeHandle}
                onKeyDown={onKeyPressHandler}
                error={inputError}
                label='Task text'
                helperText={makeHelperText()}
            />

            <IconButton
                disabled={isInputBtnDisabled || userErrorLengthMessage}
                onClick={addItemHandler}
                color='primary'
                size="medium"
                sx={{ml: '10px'}}
            >
                <AddBox fontSize='inherit' />
            </IconButton>

            {/* {isInputBtnDisabled && !inputError && <p style={{ color: "skyblue" }}>Max length task title is {maxTitleLength} symbols</p>}
            {!isInputBtnDisabled && !inputError && !userErrorLengthMessage && <p style={{ color: 'darkgreen' }}>{userLengthMessage}</p>}
            {userErrorLengthMessage && <p style={{ color: 'darkred' }}>Title to long</p>}
            {inputError && <div style={{ color: 'red' }}>Title is required</div>} */}
        </div>
    )
}
