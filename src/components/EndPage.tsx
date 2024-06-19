import { Word } from "../utils/types";
import { Heading } from "./Heading";

const listIcon = <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M11 15H17V17H11V15M9 7H7V9H9V7M11 13H17V11H11V13M11 9H17V7H11V9M9 11H7V13H9V11M21 5V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H19C20.1 3 21 3.9 21 5M19 5H5V19H19V5M9 15H7V17H9V15Z" /></svg>

interface Props {
    maxNumberOfWords: number,
    setStatus: React.Dispatch<React.SetStateAction<string>>,
    onClick: () => void,
    wrongWords: Word[],
}

function EndPage({ wrongWords, maxNumberOfWords, setStatus, onClick }: Props) {
    document.title = "Results";
    const score = maxNumberOfWords - wrongWords.length;

    return (<main>
        <Heading>Results</Heading>
        <div className="score" aria-hidden="true">{score}</div>
        <p>You got correct <span className="highlight">{score} out of {maxNumberOfWords}</span> words</p>
        <div className="buttons">
            <button type="button" className="list" onClick={() => { setStatus("review") }}>{listIcon}Seen words</button>
            <button type="button" className="start" onClick={onClick}>Start New Game</button>
        </div>
    </main>)
}

export default EndPage; 