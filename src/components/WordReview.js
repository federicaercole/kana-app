function WordReview({ setStatus, setSelectedKana, setMessage, selectedWords, wrongWords }) {

    return (
        <>
            <h1>List of the reviewed words</h1>
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
                                <td lang="ja-jp">{word.kana}</td>
                                <td>{word.romaji.join("")}</td>
                                <td lang="ja-jp">{word.kanji}</td>
                            </tr>)
                    })}
                </tbody>
            </table>
            <button type="button" className="start" onClick={() => { setStatus("start"); setSelectedKana([]) }}>New Game</button>
        </>)
}

export default WordReview;