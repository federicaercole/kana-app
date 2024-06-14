import { useState, useEffect } from "react";
import { hiraganaWords } from "./utils/hiraganaWords";
import { katakanaWords } from "./utils/katakanaWords";
import { initialSounds, totalKana } from "./utils/syllabes";
import StartPage from "./components/StartPage";
import Card from "./components/Card";
import Settings from "./components/Settings";
import Message from "./components/Message";
import EndPage from "./components/EndPage";
import WordReview from "./components/WordReview";
import { Word } from "./utils/types";

const backIcon = <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" /></svg>;

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
      return (<main>
        <Settings selectedKana={selectedKana} setSelectedKana={setSelectedKana} setMaxNumberOfWords={setMaxNumberOfWords} isHiragana={isHiragana} />
        <Message message={message} key={message} />
        <div className="buttons">
          <button type="button" className="back" onClick={returnToStart}>{backIcon} Back</button>
          <button type="button" className="start" onClick={startApp}>Start</button>
        </div>
      </main>);
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