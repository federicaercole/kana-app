import { useEffect, useState } from "react";
import Message from "./Message";

function Card({ selectedWords, maxNumberOfWords, setStatus, message, setMessage, setScore, wrongWords, setWrongWords }) {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [romaji, setRomaji] = useState("");

    useEffect(() => {
        const degree = (360 / maxNumberOfWords);
        const progressBar = document.querySelector(".progress");

        progressBar.style.background = `conic-gradient(var(--primary-color) ${(currentWordIndex + 1) * degree}deg, var(--secondary-color) 0deg)`
    }, [currentWordIndex, maxNumberOfWords])

    const handleChange = (e) => {
        setRomaji(e.target.value);
    };

    function checkWord(e) {
        const input = document.querySelector("input");
        if (!input.checkValidity()) {
            setMessage("Write the romaji transcription of the word");
            e.preventDefault();
        } else {
            if (romaji.toLowerCase() === selectedWords[currentWordIndex].romaji.join("")) {
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
            setMessage("");
            setStatus("end");
        }
    }

    function seeSolution() {
        setRomaji(selectedWords[currentWordIndex].romaji.join(""));
        setMessage("");
    }

    function handleKeyInput(e) {
        if (e.key === 'Enter') {
            checkWord(e);
        }
    }
    return (
        <>
            <div className="progress">
                <p>{currentWordIndex + 1}/{maxNumberOfWords}</p>
            </div>
            <label htmlFor="kanaWord" className="word" lang="ja-jp">{selectedWords[currentWordIndex].kana}</label>
            <div className="inputWord">
                <input type="text" id="kanaWord" value={romaji} onChange={handleChange} onKeyDown={(e) => handleKeyInput(e)} required />
                <button type="button" className="submit" onClick={checkWord}>Submit</button>
            </div>
            {message !== "" && <Message message={message} />}
            {/retry/i.test(message) && <button className="solution" onClick={seeSolution}><span>See the solution</span></button>}
        </>
    )
}

export default Card;