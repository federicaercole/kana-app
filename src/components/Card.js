import { useState } from "react";
import Message from "./Message";

function Card({ selectedWords, maxNumberOfWords, setStatus, message, setMessage }) {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [romaji, setRomaji] = useState("");
    const [wrongWords, setWrongWords] = useState([]);
    const [score, setScore] = useState(0);

    const handleChange = (e) => {
        setRomaji(e.target.value);
    };

    function checkWord(e) {
        const input = document.querySelector("input");
        if (!input.checkValidity()) {
            setMessage("Write the romaji transcription of the word");
            e.preventDefault();
        } else {
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
                setMessage("Wrong answer! If you want you can retry");
            }
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

    function seeSolution() {
        setRomaji(selectedWords[currentWordIndex].romaji.join(""));
        setMessage("");
    }

    return (
        <>
            <p>{currentWordIndex + 1}/{maxNumberOfWords}</p>
            <p>{score}</p>
            <p className="word">{selectedWords[currentWordIndex].kana}</p>
            <input type="text" name="romaji" value={romaji} onChange={handleChange} required />
            <button type="button" onClick={checkWord}>Submit</button>
            {message !== "" && <Message message={message} />}
            {/retry/i.test(message) && <button onClick={seeSolution}>See the solution</button>}
        </>
    )
}

export default Card;