
type ButtonPropsType = {
    title: string
    onClickHandler?: () => void

    disabled?: boolean
    styledClass?: string
}

export const Button = (props: ButtonPropsType) => {

    return (
        <button style={{cursor: 'pointer'}}
            className={props.styledClass}
            disabled={props.disabled}
            onClick={props.onClickHandler}
        >
            {props.title}
        </button>
    )
}