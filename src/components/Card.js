import { useState } from "react";

function Card({ selectedWords, maxNumberOfWords, setStatus, message, setMessage }) {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [romaji, setRomaji] = useState("");
    const [wrongWords, setWrongWords] = useState([]);
    const [score, setScore] = useState(0);

    const handleChange = (e) => {
        setRomaji(e.target.value);
    };

    function checkWord() {
        if (romaji === selectedWords[currentWordIndex].romaji.join("")) {
            if (!wrongWords.find(item => item === selectedWords[currentWordIndex])) {
                setScore(prev => prev + 1);
            }
            nextWord();
            setRomaji("");
        } else {
            if (!wrongWords.find(item => item === selectedWords[currentWordIndex])) {
                setWrongWords(wrongWords.concat(selectedWords[currentWordIndex]));
            }
            setMessage("Ops, your answer is wrong! Retry!");
        }
    }

    function nextWord() {
        if (currentWordIndex < selectedWords.length - 1) {
            setCurrentWordIndex(prev => prev + 1);
            setMessage("");
        } else {
            setStatus("end");
        }
    }

    //mettere un check per il campo se è vuoto

    return (
        <>
            <p>{currentWordIndex + 1} of {maxNumberOfWords}</p>
            <p>Score: {score}</p>
            <p>{selectedWords[currentWordIndex].kana}</p>
            <input type="text" name="romaji" value={romaji} onChange={handleChange} />
            {message !== "" && <p>{message}</p>}
            {/retry/i.test(message) && <button type="button">Give up and see the solution</button>}
            <button type="button" onClick={checkWord}>Submit</button>
        </>
    )
}

export default Card;