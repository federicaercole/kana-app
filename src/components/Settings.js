import { useEffect } from "react";

const aLine = ["a", "i", "u", "e", "o"];
const kaLine = ["ka", "ki", "ku", "ke", "ko"];

function Settings({ selectedKana, setSelectedKana, setIsHiragana, isHiragana, setMaxNumberOfWords }) {

    const allKanaCheckbox = document.querySelector("#selectAll");

    useEffect(() => {
        const hiraganaButton = document.querySelector(".hiragana");
        const katakanaButton = document.querySelector(".katakana");
        const checkboxes = [...document.querySelectorAll("input[type='checkbox']")];

        if (isHiragana) {
            katakanaButton.classList.add("inactive");
            hiraganaButton.classList.remove("inactive");
        } else {
            hiraganaButton.classList.add("inactive");
            katakanaButton.classList.remove("inactive");
        }

        checkboxes.forEach(checkbox => checkbox.checked = false);
        setSelectedKana([]);
    }, [isHiragana, setSelectedKana])

    useEffect(() => {
        const checkboxesNotAllKana = [...document.querySelectorAll("input[type='checkbox']")].slice(1);
        if (checkboxesNotAllKana.every((checkbox) => checkbox.checked)) {
            allKanaCheckbox.checked = true;
        }
    })

    function selectKana(e, line) {
        if (e.target.checked) {
            setSelectedKana(selectedKana.concat(line));
        } else {
            setSelectedKana(selectedKana.filter((item) => !line.includes(item)))
            allKanaCheckbox.checked = false;
        }
    }

    function selectNumber(e) {
        setMaxNumberOfWords(Number(e.target.value));
    }

    function selectAllKana() {
        const checkboxes = [...document.querySelectorAll("input[type='checkbox']")];
        if (allKanaCheckbox.checked) {
            checkboxes.forEach(checkbox => checkbox.checked = true);
            setSelectedKana(selectedKana.concat(aLine, kaLine));
        } else {
            checkboxes.forEach(checkbox => checkbox.checked = false);
            setSelectedKana([]);
        }
    }

    return (
        <> <button type="button" className="hiragana" onClick={() => setIsHiragana(true)}>Hiragana</button>
            <button type="button" className="katakana" onClick={() => setIsHiragana(false)}>Katakana</button>
            <div className="allKana">
                <input id="selectAll" type="checkbox" onClick={() => selectAllKana()} />
                <label htmlFor="selectAll">Select all kana</label>
            </div>
            <div>
                <input id="aLine" type="checkbox" onClick={(e) => selectKana(e, aLine)} />
                <label htmlFor="aLine">{isHiragana ? "あ a・い i・う u・え e・お o" : "ア a・イ i・ウ u・エ e・オ o"}</label>
            </div>
            <div>
                <input id="kaLine" type="checkbox" onClick={(e) => selectKana(e, kaLine)} />
                <label htmlFor="kaLine">{isHiragana ? "か ka・き ki・く ku・け ke・こ ko" : "カ ka・キ ki・ク ku・ケ ke・コ ko"}</label>
            </div>

            <label htmlFor="numberOfWords">Number of words to review</label>
            <select id="numberOfWords" name="words" onChange={selectNumber}>
                <option defaultValue="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
            </select>

        </>)
}

export default Settings;