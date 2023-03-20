import { doubleSounds } from "../App";
const listIcon = <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>list-box-outline</title><path d="M11 15H17V17H11V15M9 7H7V9H9V7M11 13H17V11H11V13M11 9H17V7H11V9M9 11H7V13H9V11M21 5V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H19C20.1 3 21 3.9 21 5M19 5H5V19H19V5M9 15H7V17H9V15Z" /></svg>

function EndPage({ score, selectedWords, setStatus, setSelectedKana }) {
    return (<>
        <h1>Results</h1>
        <div className="score">{score}</div>
        <p>You got correct <span className="highlight">{score} out of {selectedWords.length}</span> words</p>
        <button type="button" className="list" onClick={() => { setStatus("review") }}>{listIcon}List of seen words</button>
        <button type="button" className="start" onClick={() => { setStatus("start"); setSelectedKana(doubleSounds) }}>Start New Game</button>
    </>)
}

export default EndPage; 