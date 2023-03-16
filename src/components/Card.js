import { useEffect, useState } from "react";
import Message from "./Message";

function Card({ selectedWords, maxNumberOfWords, setStatus, message, setMessage }) {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [romaji, setRomaji] = useState("");
    const [wrongWords, setWrongWords] = useState([]);
    const [score, setScore] = useState(0);

    useEffect(() => {
        const degree = (360 / maxNumberOfWords);
        const progressBar = document.querySelector(".progress");

        progressBar.style.background = `conic-gradient(var(--primary-color) ${(currentWordIndex + 1) * degree}deg, white 0deg)`
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
            <div className="progress">
                <p>{currentWordIndex + 1}/{maxNumberOfWords}</p>
            </div>
            <div className="score"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" /></svg> <p>{score}</p></div>
            <label htmlFor="kanaWord" className="word">{selectedWords[currentWordIndex].kana}</label>
            <div className="inputWord">
                <input type="text" id="kanaWord" value={romaji} onChange={handleChange} required />
                <button type="button" className="submit" onClick={checkWord}>Submit</button>
            </div>
            {message !== "" && <Message message={message} />}
            {/retry/i.test(message) && <button className="solution" onClick={seeSolution}><span>See the solution</span></button>}
        </>
    )
}

export default Card;