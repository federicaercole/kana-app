import { useState, useEffect } from "react";
import { hiraganaWords } from "./utils/hiraganaWords";
import StartPage from "./components/StartPage";
import Card from "./components/Card";
import Settings from "./components/Settings";
import Message from "./components/Message";
import EndPage from "./components/EndPage";
import WordReview from "./components/WordReview";

const backIcon = <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" /></svg>;

function App() {
  const [selectedKana, setSelectedKana] = useState([]);
  const [selectedWords, setSelectedWords] = useState([]);
  const [maxNumberOfWords, setMaxNumberOfWords] = useState(10);
  const [status, setStatus] = useState("start");
  const [message, setMessage] = useState("");
  const [isHiragana, setIsHiragana] = useState(true);
  const [score, setScore] = useState(0);
  const [wrongWords, setWrongWords] = useState([]);

  useEffect(() => {
    const hiraganaButton = document.querySelector(".hiragana");
    const katakanaButton = document.querySelector(".katakana");

    if (isHiragana) {
      katakanaButton.classList.add("inactive");
      hiraganaButton.classList.remove("inactive");
    } else {
      hiraganaButton.classList.add("inactive");
      katakanaButton.classList.remove("inactive");
    }
  }, [isHiragana])

  function selectWordsRandom() {
    const selectedWordsSet = new Set();
    //array only if not all kana selected
    const filteredWords = hiraganaWords.filter(word => word.romaji.every((letter) => {
      return selectedKana.indexOf(letter) !== -1;
    }));
    if (filteredWords.length > maxNumberOfWords) {
      while (selectedWordsSet.size < maxNumberOfWords) {
        const randomIndex = Math.floor(Math.random() * filteredWords.length);
        selectedWordsSet.add(filteredWords[randomIndex]);
      }
      setSelectedWords([...selectedWordsSet]);
    } else {
      shuffle(filteredWords);
      setMaxNumberOfWords(filteredWords.length);
      setSelectedWords(filteredWords);
    }
  }

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  function startApp(e) {
    if (selectedKana.length !== 0) {
      reset();
    } else {
      e.preventDefault();
      setMessage("Select the kana you want to study")
    }
  }

  function reset() {
    selectWordsRandom();
    setWrongWords([]);
    setScore(0);
    setMessage("");
    setStatus("play");
  }

  return (
    <>
      <main>
        {status === "start" && <StartPage status={status} setStatus={setStatus} setIsHiragana={setIsHiragana} />}
        {status === "settings" && <Settings status={status} selectedKana={selectedKana} setSelectedKana={setSelectedKana} setMaxNumberOfWords={setMaxNumberOfWords} isHiragana={isHiragana} />}

        {message !== "" && status === "settings" && <Message message={message} />}
        {status === "settings" && <button type="button" className="back" onClick={() => {
          setStatus("start"); setSelectedKana([]); setIsHiragana(true); setMessage("")
        }}>{backIcon} Back</button>}
        {status === "settings" && <button type="button" className="start" onClick={(e) => startApp(e)}>Start</button>}

        {status === "play" && <Card selectedWords={selectedWords} setStatus={setStatus} maxNumberOfWords={maxNumberOfWords} message={message} setMessage={setMessage} setScore={setScore}
          wrongWords={wrongWords} setWrongWords={setWrongWords} />}
        {status === "end" && <EndPage score={score} selectedWords={selectedWords} setStatus={setStatus} setSelectedKana={setSelectedKana} />}
        {status === "review" && <WordReview setStatus={setStatus} setMessage={setMessage} setSelectedKana={setSelectedKana} selectedWords={selectedWords} wrongWords={wrongWords} />}
      </main>
      <footer></footer>
    </>
  )

}

export default App;