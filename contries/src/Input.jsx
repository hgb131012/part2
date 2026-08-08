const Input = (props) => {
    return (
        <div>
            Find countries <input value={props.value} onChange={props.onChange}></input>
        </div>
    )
}

export default Input;