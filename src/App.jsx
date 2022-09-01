import DieBox from "./DieBox"
import { useState, useEffect } from "react"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

export default function App() {
    let [dice, setDice] = useState(allNewDice())
    let [isWon, setIsWon] = useState(false)


    useEffect(
        () => {
            const standard = dice[0].value;
            const resoult = dice.every(die => (
                die.isHeld && die.value === standard
            ))
            if(resoult) {
                setIsWon(resoult)
            }
        }
    , [dice])

    function allNewDice() {
        let newDice = new Array(10)
        for(let i = 0; i < newDice.length; i++) {
            newDice[i] = {
                id: nanoid(),
                value: Math.ceil(Math.random() * 6),
                isHeld: false,
            }
        }
        return newDice;
    }

    function handleClick() {
        if (isWon) {
            setDice(allNewDice())
            setIsWon(false)
        }
        else setDice(prevState => (
            prevState.map(die => (
                die.isHeld ? die :
                {...die, value: Math.ceil(Math.random() * 6)}
            ))
        ))
    }

    function hold(id) {
        setDice(prevState => (
            prevState.map(die => (
                die.id === id ?
                    {...die, isHeld: !die.isHeld} : die
            ))
        ))
    }



    return (
        <main className="main">
            {isWon && <Confetti />}
            <div className="desription">
                <h1 className="description_title">Кубики</h1>
                <p className="description_text">Бросайте кубики, пока они не станут одинаковыми! Нажмите на кубик, чтобы его зафиксировать.</p>
            </div>
            <DieBox hold={hold} dice={dice}/>
            <button className="roll" onClick={handleClick}>
                {isWon ? "Заново" : "Бросить"}
            </button>
        </main>
    )
}