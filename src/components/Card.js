import { useEffect, useState } from "react";
import Message from "./Message";

const solutionIcon = <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" /></svg>

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
            if (romaji.toLowerCase() === selectedWords[currentWordIndex].romaji.join("").replaceAll("-", "")) {
                if (!wrongWords.find(item => item === selectedWords[currentWordIndex])) {
                    setScore(prev => prev + 1);
                }
                nextWord();
                setRomaji("");
            } else {
                if (!wrongWords.find(item => item === selectedWords[currentWordIndex])) {
                    setWrongWords(wrongWords.concat(selectedWords[currentWordIndex]));
                }
                setMessage("Wrong answer! Want to retry?");
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
        setRomaji(selectedWords[currentWordIndex].romaji.join("").replaceAll("-", ""));
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
            <label htmlFor="kanaWord" className="word" key={selectedWords[currentWordIndex].kana} lang="ja-jp">{selectedWords[currentWordIndex].kana}</label>
            <div className="inputWord">
                <input type="text" id="kanaWord" value={romaji} onChange={handleChange} onKeyDown={(e) => handleKeyInput(e)} required />
                <button type="button" className="submit" onClick={checkWord}>Submit</button>
            </div>
            {message !== "" && <Message message={message} />}
            {/retry/i.test(message) && <button className="solution" onClick={seeSolution}>{solutionIcon} See the solution</button>}
        </>
    )
}

export default Card;