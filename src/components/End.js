function End({ score, selectedWords, wrongWords, setStatus, setSelectedKana, setMessage }) {

    return (<>
        <h1>Results</h1>
        <div className="score">{score}</div>
        <p>You got correct <strong>{score} out of {selectedWords.length}</strong> words</p>
        <button type="button" className="start" onClick={() => { setStatus("settings"); setSelectedKana([]); setMessage("") }}>New Game</button>
        {/*
        <h2>List of the reviewed words</h2>
        {score !== selectedWords.length && <p>The highlighted words are the ones you got wrong.</p>}
        <table>
            <thead>
                <tr>
                    <th>Kana</th>
                    <th>Romaji</th>
                    <th>Kanji</th>
                </tr>
            </thead>
            <tbody>
                {selectedWords.map((word) => {
                    return (
                        <tr key={word.kana} className={wrongWords.includes(word) ? "wrong" : ""}>
                            <td lang="ja">{word.kana}</td>
                            <td>{word.romaji.join("")}</td>
                            <td lang="ja">{word.kanji}</td>
                        </tr>)
                })}
            </tbody>
        </table> */}
    </>)
}

export default End; 