import { useState, useEffect } from "react";
import { hiraganaWords } from "./utils/hiraganaWords";
import { katakanaWords } from "./utils/katakanaWords";
import { initialSounds, totalKana } from "./utils/syllabes";
import StartPage from "./components/StartPage";
import Card from "./components/Card";
import Settings from "./components/Settings";
import EndPage from "./components/EndPage";
import WordReview from "./components/WordReview";
import { Word } from "./utils/types";

function App() {
  const [selectedKana, setSelectedKana] = useState(initialSounds);
  const [selectedWords, setSelectedWords] = useState<Word[]>([]);
  const [maxNumberOfWords, setMaxNumberOfWords] = useState(10);
  const [status, setStatus] = useState("start");
  const [message, setMessage] = useState("");
  const [isHiragana, setIsHiragana] = useState(true);
  const [wrongWords, setWrongWords] = useState<Word[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [status]);

  function selectWordsRandom(filteredWords: Word[]) {
    const selectedWordsSet: Set<Word> = new Set();

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

  function setArrayOfWords() {
    const array = isHiragana ? hiraganaWords : katakanaWords;
    if (selectedKana.length === (totalKana + initialSounds.length)) {
      return array;
    } else {
      return array.filter(word => word.romaji.every((letter) => {
        return selectedKana.indexOf(letter) !== -1;
      }))
    }
  }

  function shuffle(array: Word[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  function startApp() {
    const filteredWords = setArrayOfWords();
    if (selectedKana.length === initialSounds.length) {
      setMessage("Error: You didn't select any kana. Select the kana you want to study");
    } else if (filteredWords.length === 0) {
      setMessage("Error: There aren't any words with these kana. Select more kana");
    } else {
      selectWordsRandom(filteredWords);
      setStatus("play");
      setMessage("");
    }
  }

  function returnToStart() {
    setStatus("start");
    setSelectedKana(initialSounds);
    setIsHiragana(true);
    setMessage("");
    setMaxNumberOfWords(10);
    setWrongWords([]);
  }

  switch (status) {
    case "start":
      return (<StartPage setStatus={setStatus} setIsHiragana={setIsHiragana} />);
    case "settings":
      return (<Settings selectedKana={selectedKana} setSelectedKana={setSelectedKana} setMaxNumberOfWords={setMaxNumberOfWords} isHiragana={isHiragana}
        returnToStart={returnToStart} startApp={startApp} message={message} />);
    case "play":
      return (<Card selectedWords={selectedWords} setStatus={setStatus} maxNumberOfWords={maxNumberOfWords} message={message} setMessage={setMessage}
        wrongWords={wrongWords} setWrongWords={setWrongWords} />);
    case "end":
      return (<EndPage wrongWords={wrongWords} maxNumberOfWords={maxNumberOfWords} setStatus={setStatus} onClick={returnToStart} />)
    case "review":
      return (<WordReview isHiragana={isHiragana} selectedWords={selectedWords} wrongWords={wrongWords} onClick={returnToStart} />)
    default:
      return;
  }
}

export default App;