function Settings({ selectedKana, setSelectedKana, message, setMaxNumberOfWords }) {

    const aLine = ["a", "i", "u", "e", "o"];
    const kaLine = ["ka", "ki", "ku", "ke", "ko"];

    function selectKana(line) {
        if (selectedKana.indexOf(line[0]) === -1)
            setSelectedKana(selectedKana.concat(line));
        else {
            setSelectedKana(selectedKana.filter((item) => !line.includes(item)))
        }
    }

    function selectNumber(e) {
        setMaxNumberOfWords(Number(e.target.value));
    }

    return (
        <>
            {message !== "" && <p>{message}</p>}
            <button type="button" onClick={() => selectKana(aLine)}>Review あ a/い i/う u/え e/お o</button>
            <button type="button" onClick={() => selectKana(kaLine)}>Review か ka/き ki/く ku/け ke/こ ko</button>
            <label htmlFor="numberOfWords">Max number of words to review</label>
            <select id="numberOfWords" name="words" onChange={selectNumber}>
                <option defaultValue="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
            </select>
        </>)
}

export default Settings;