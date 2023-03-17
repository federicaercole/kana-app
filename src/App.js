import { useState } from "react";
import { hiraganaWords } from "./utils/hiraganaWords";
import Card from "./components/Card";
import Settings from "./components/Settings";
import Message from "./components/Message";
import End from "./components/End";

function App() {
  const [selectedKana, setSelectedKana] = useState([]);
  const [selectedWords, setSelectedWords] = useState([]);
  const [maxNumberOfWords, setMaxNumberOfWords] = useState(10);
  const [status, setStatus] = useState("settings");
  const [message, setMessage] = useState("");
  const [isHiragana, setIsHiragana] = useState(true);
  const [score, setScore] = useState(0);
  const [wrongWords, setWrongWords] = useState([]);

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
      {status === "settings" && <h1>What do you want to <span className="highlight">practice</span>?</h1>}
      {status === "settings" && <Settings selectedKana={selectedKana} setSelectedKana={setSelectedKana} setMaxNumberOfWords={setMaxNumberOfWords} setIsHiragana={setIsHiragana} isHiragana={isHiragana} />}
      {message !== "" && status === "settings" && <Message message={message} />}
      {status === "settings" && <button type="button" className="start" onClick={(e) => startApp(e)}>Start</button>}
      {status === "play" && <Card selectedWords={selectedWords} setStatus={setStatus} maxNumberOfWords={maxNumberOfWords} message={message} setMessage={setMessage} setScore={setScore}
        wrongWords={wrongWords} setWrongWords={setWrongWords} />}
      {status === "end" && <End score={score} selectedWords={selectedWords} wrongWords={wrongWords} setStatus={setStatus} setSelectedKana={setSelectedKana} setMessage={setMessage} />}
    </>
  )

}

export default App;