import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import { Button } from './Button'

type AddItemFormPropsType = {
    maxTitleLength: number
    addItem: (title: string) => void
}

export const AddItemForm = ({
    maxTitleLength,
    addItem
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

    return (
        <div>
            <input
                value={titleInputValue}
                onChange={onNewTitleChangeHandle}
                onKeyDown={onKeyPressHandler}
                className={inputError ? 'input-error' : ''}
            />
            <Button
                title="+"
                disabled={isInputBtnDisabled || userErrorLengthMessage}
                onClickHandler={addItemHandler}
            />
            {isInputBtnDisabled && !inputError && <p style={{ color: "skyblue" }}>Max length task title is {maxTitleLength} symbols</p>}
            {!isInputBtnDisabled && !inputError && !userErrorLengthMessage && <p style={{ color: 'darkgreen' }}>{userLengthMessage}</p>}
            {userErrorLengthMessage && <p style={{ color: 'darkred' }}>Title to long</p>}
            {inputError && <div style={{ color: 'red' }}>Title is required</div>}
        </div>
    )
}
