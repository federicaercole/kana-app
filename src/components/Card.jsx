import { useEffect, useState } from "react";
import Message from "./Message";

const solutionIcon = <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" /></svg>

function Card({ selectedWords, maxNumberOfWords, setStatus, message, setMessage, setScore, wrongWords, setWrongWords }) {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [romaji, setRomaji] = useState("");

    document.title = `Review the words - ${currentWordIndex + 1} of ${maxNumberOfWords}`

    useEffect(() => {
        const degree = (360 / maxNumberOfWords);
        const progressBar = document.querySelector(".progress");

        progressBar.style.background = `conic-gradient(var(--primary-color-dark) ${(currentWordIndex + 1) * degree}deg, var(--primary-color) 0deg)`
    }, [currentWordIndex, maxNumberOfWords])

    const handleChange = (e) => {
        setRomaji(e.target.value);
    };

    useEffect(() => {
        const label = document.querySelector("label");
        label.focus();
    }, []);

    function checkWord(e) {
        const input = document.querySelector("input");
        if (!input.checkValidity()) {
            setMessage("Write the romaji transcription of the word");
            e.preventDefault();
        } else {
            if (romaji.trim().toLowerCase() === selectedWords[currentWordIndex].romaji.join("").replaceAll("-", "")) {
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
        <main>
            <section className="progress" aria-label="Number of words to review">
                <h1>{currentWordIndex + 1}/{maxNumberOfWords}</h1>
            </section>
            <label htmlFor="kana-word" className="word" key={selectedWords[currentWordIndex].kana} lang="ja" aria-live="polite" tabIndex="-1">{selectedWords[currentWordIndex].kana}</label>
            <div className="input-word">
                <input type="text" id="kana-word" value={romaji} onChange={handleChange} onKeyDown={(e) => handleKeyInput(e)} required />
                <button type="button" className="submit" onClick={checkWord}>Submit</button>
            </div>
            <Message message={message} key={message} />
            {/retry/i.test(message) && <button className="solution" aria-live="polite" onClick={seeSolution}>{solutionIcon} See the solution</button>}
        </main>
    )
}

export default Card;