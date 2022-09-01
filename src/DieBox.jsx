import Die from "./Die"

export default function  DieBox(props) {
    return (
        <div className="DieBox">
            {props.dice.map(die => (
                <Die
                    key={die.id}
                    value={die.value}
                    isHeld={die.isHeld}
                    hold={() => props.hold(die.id)}
                />
            ))}
        </div>
    )
}