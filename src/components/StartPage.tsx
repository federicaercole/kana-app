const nextIcon = <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" /></svg>

interface Props {
    setStatus: React.Dispatch<React.SetStateAction<string>>,
    setIsHiragana: React.Dispatch<React.SetStateAction<boolean>>,
}

function StartPage({ setStatus, setIsHiragana }: Props) {
    document.title = "Kana App - What do you want to practice?";

    return (
        <main>
            <fieldset>
                <legend><h1 tabIndex={-1}>What do you want to <span className="highlight">practice</span>?</h1></legend>
                <div className="button">
                    <input type="radio" name="kana" id="hiragana" defaultChecked onClick={() => setIsHiragana(true)} />
                    <label htmlFor="hiragana">Hiragana</label>
                </div>
                <div className="button">
                    <input type="radio" name="kana" id="katakana" onClick={() => setIsHiragana(false)} />
                    <label htmlFor="katakana">Katakana</label>
                </div>
            </fieldset>
            <button type="button" className="next" onClick={() => { setStatus("settings") }}>Next {nextIcon}</button>
        </main>)
}

export default StartPage;