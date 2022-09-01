export default function Die(props) {
    return (
        <div
            className={props.isHeld ? "Die isHeld" : "Die"}
            onClick={props.hold} >
                {props.value}
        </div>
    )
}