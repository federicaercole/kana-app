import { Word } from "../utils/types";
const infoIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false" width="24" height="24"><path d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z" /></svg>

interface Props {
    isHiragana: boolean,
    selectedWords: Word[],
    wrongWords: Word[],
    onClick: () => void,
    innerRef: React.MutableRefObject<HTMLHeadingElement>,
}

function WordReview({ isHiragana, selectedWords, wrongWords, onClick, innerRef }: Props) {
    document.title = "List of reviewed words";

    return (
        <main>
            <h1 ref={innerRef} tabIndex={-1}>List of reviewed words</h1>
            {wrongWords.length !== 0 && <p className="info">{infoIcon} The highlighted words are the ones you got wrong</p>}
            <table>
                <thead>
                    <tr>
                        <th scope="col">Kana</th>
                        <th scope="col">Romaji</th>
                        {isHiragana && <th scope="col">Kanji</th>}
                    </tr>
                </thead>
                <tbody>
                    {selectedWords.map((word) => {
                        return (
                            <tr key={word.kana} className={wrongWords.includes(word) ? "wrong" : ""}>
                                <td lang="ja">{word.kana}</td>
                                <td>{word.romaji.join("").replaceAll("-", "")}</td>
                                {isHiragana && <td lang="ja">{word.kanji}</td>}
                            </tr>)
                    })}
                </tbody>
            </table>
            <button type="button" className="start" onClick={onClick}>Start New Game</button>
        </main>)
}

export default WordReview;