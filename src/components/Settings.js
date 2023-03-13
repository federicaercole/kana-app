function Settings({ selectedKana, setSelectedKana }) {

    const aLine = ["a", "i", "u", "e", "o"];
    const kaLine = ["ka", "ki", "ku", "ke", "ko"];

    function selectKana(line) {
        if (selectedKana.indexOf(line[0]) === -1)
            setSelectedKana(selectedKana.concat(line));
        else {

        }
    }

    return (
        <>
            <button type="button" onClick={() => selectKana(aLine)}>Review あ a/ い i/ う u/ え e/ お o</button>
            <button type="button" onClick={() => selectKana(kaLine)}>Review か ka/ き ki/ く ku/ け ke/ こ ko</button>
        </>)
}

export default Settings;