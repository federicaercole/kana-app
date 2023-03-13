import { useState } from "react";
import { hiraganaWords } from "./utils/hiraganaWords";
import Card from "./components/Card";
import Settings from "./components/Settings";

function App() {
  const [selectedKana, setSelectedKana] = useState([]);
  const [selectedWords, setSelectedWords] = useState([]);
  const [maxNumberOfWords, setMaxNumberOfWords] = useState(10);
  const [status, setStatus] = useState("settings");

  function selectWordsRandom() {
    const selectedWordsSet = new Set();
    //array only if not alla kana selected
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

  return (
    <>
      <Settings selectedKana={selectedKana} setSelectedKana={setSelectedKana} />
      <button type="button" onClick={() => { setStatus("play"); selectWordsRandom() }}>Start</button>
      {status === "play" && <Card selectedWords={selectedWords} setStatus={setStatus} maxNumberOfWords={maxNumberOfWords} />}
    </>
  )

}

export default App;