import { useEffect, useState, useRef } from "react";
import Message from "./Message";
import { Word } from "../utils/types";

const solutionIcon = <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" /></svg>

interface Props {
    selectedWords: Word[],
    maxNumberOfWords: number,
    setStatus: React.Dispatch<React.SetStateAction<string>>,
    message: string,
    setMessage: React.Dispatch<React.SetStateAction<string>>,
    wrongWords: Word[],
    setWrongWords: React.Dispatch<React.SetStateAction<Word[]>>,
}

function Card({ selectedWords, maxNumberOfWords, setStatus, message, setMessage, wrongWords, setWrongWords }: Props) {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [romaji, setRomaji] = useState("");
    const progressBar = useRef<HTMLElement>(null);
    const input = useRef<HTMLInputElement>(null)
    const label = useRef<HTMLLabelElement>(null);

    document.title = `Review the words - ${currentWordIndex + 1} of ${maxNumberOfWords}`

    useEffect(() => {
        const degree = (360 / maxNumberOfWords);
        if (progressBar.current) {
            progressBar.current.style.background = `conic-gradient(var(--primary-color-dark) ${(currentWordIndex + 1) * degree}deg, var(--primary-color) 0deg)`;
        }
    }, [currentWordIndex, maxNumberOfWords])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRomaji(e.target.value);
    };

    useEffect(() => {
        label.current?.focus();
    }, []);

    function checkWord(e: React.SyntheticEvent<HTMLElement>) {
        if (!input.current?.checkValidity()) {
            setMessage("Write the romaji transcription of the word");
            e.preventDefault();
        } else {
            if (romaji.trim().toLowerCase() === selectedWords[currentWordIndex].romaji.join("").replaceAll("-", "")) {
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

    function handleKeyInput(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            checkWord(e);
        }
    }

    return (
        <main>
            <section ref={progressBar} className="progress" aria-label="Number of words to review">
                <h1>{currentWordIndex + 1}/{maxNumberOfWords}</h1>
            </section>
            <label htmlFor="kana-word" className="word" key={selectedWords[currentWordIndex].kana} lang="ja" aria-live="polite" tabIndex={-1} ref={label}>{selectedWords[currentWordIndex].kana}</label>
            <div className="input-word">
                <input type="text" id="kana-word" value={romaji} onChange={handleChange} onKeyDown={handleKeyInput} ref={input} required />
                <button type="button" className="submit" onClick={checkWord}>Submit</button>
            </div>
            <Message message={message} />
            {/retry/i.test(message) && <button className="solution" aria-live="polite" onClick={seeSolution}>{solutionIcon} See the solution</button>}
        </main>
    )
}

export default Card;