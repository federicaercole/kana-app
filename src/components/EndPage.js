function EndPage({ score, selectedWords, setStatus, setSelectedKana }) {
    return (<>
        <h1>Results</h1>
        <div className="score">{score}</div>
        <p>You got correct <strong>{score} out of {selectedWords.length}</strong> words</p>
        <button type="button" className="start" onClick={() => { setStatus("start"); setSelectedKana([]) }}>New Game</button>
        <button type="button" onClick={() => { setStatus("review") }}>List of the encountered words</button>
    </>)
}

export default EndPage; 