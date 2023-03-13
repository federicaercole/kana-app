import { useState } from "react";

function Card({ selectedWords, maxNumberOfWords, setStatus }) {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [romaji, setRomaji] = useState("");

    const handleChange = (e) => {
        setRomaji(e.target.value);
    };

    function checkWord() {
        if (romaji === selectedWords[currentWordIndex].romaji.join("")) {
            console.log("correct");
            nextWord();
            setRomaji("");
        } else {
            console.log("error!");
        }
    }

    function nextWord() {
        if (currentWordIndex < selectedWords.length - 1) {
            setCurrentWordIndex(prev => prev + 1);
        } else {
            setStatus("end");
        }
    }

    return (
        <>
            <p>{currentWordIndex + 1} of {maxNumberOfWords}</p>
            <p>{selectedWords[currentWordIndex].kana}</p>
            <input type="text" value={romaji} onChange={handleChange} />
            <button type="button" onClick={checkWord}>Submit</button>
        </>
    )
}

export default Card;