
type ButtonPropsType = {
    title: string
    onClickHandler?: () => void

    disabled?: boolean
}

export const Button = (props: ButtonPropsType) => {

    return (
        <button disabled={props.disabled} onClick={props.onClickHandler}>{props.title}</button>
    )
}