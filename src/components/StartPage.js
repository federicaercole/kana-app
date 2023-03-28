const nextIcon = <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" /></svg>

function StartPage({ setStatus, setIsHiragana }) {
    return (
        <main>
            <h1>What do you want to <span className="highlight">practice</span>?</h1>
            <button type="button" className="hiragana" onClick={() => setIsHiragana(true)}>Hiragana</button>
            <button type="button" className="katakana inactive" onClick={() => setIsHiragana(false)}>Katakana</button>
            <button type="button" className="next" onClick={() => { setStatus("settings") }}>Next {nextIcon}</button>
        </main>)

}

export default StartPage;