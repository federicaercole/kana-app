import { useEffect } from "react";
import { doubleSounds } from "../App";

const aLine = ["a", "i", "u", "e", "o"];
const kaLine = ["ka", "ki", "ku", "ke", "ko"];
const saLine = ["sa", "shi", "su", "se", "so"];
const taLine = ["ta", "chi", "tsu", "te", "to"];
const naLine = ["na", "ni", "nu", "ne", "no"];
const haLine = ["ha", "hi", "fu", "he", "ho"];
const maLine = ["ma", "mi", "mu", "me", "mo"];
const yaLine = ["ya", "yu", "yo", "wa", "n"];
const raLine = ["ra", "ri", "ru", "re", "ro"];
const dakutenLine = ["ga", "gi", "gu", "ge", "go",
    "za", "ji", "zu", "ze", "zo", "da", "de", "do",
    "ba", "bi", "bu", "be", "bo", "pa", "pi", "pu", "pe", "po"];
const combinationLine = ["kya", "kyu", "kyo", "gya", "gyu",
    "gyo", "cha", "chu", "cho", "nya", "nyu", "nyo", "mya",
    "myu", "myo", "rya", "ryu", "ryo", "sha", "shu", "sho", "ja", "ju", "jo",
    "hya", "hyu", "hyo", "bya", "byu", "byo", "pya", "pyu", "pyo"];

export const totalKana = aLine.length + kaLine.length + saLine.length + taLine.length + naLine.length + haLine.length +
    maLine.length + yaLine.length + raLine.length + dakutenLine.length + combinationLine.length;

function Settings({ selectedKana, setSelectedKana, isHiragana, setMaxNumberOfWords }) {

    useEffect(() => {
        const allKanaCheckbox = document.querySelector("#selectAll");
        const checkboxesNotAllKana = [...document.querySelectorAll("input[type='checkbox']")].slice(1);
        if (checkboxesNotAllKana.every((checkbox) => checkbox.checked)) {
            allKanaCheckbox.checked = true;
        }
    });

    function selectKana(e, line) {
        const allKanaCheckbox = document.querySelector("#selectAll");
        if (e.target.checked) {
            setSelectedKana(selectedKana.concat(line));
        } else {
            setSelectedKana(selectedKana.filter((item) => !line.includes(item)))
            allKanaCheckbox.checked = false;
        }
    }

    function selectAllKana() {
        const allKanaCheckbox = document.querySelector("#selectAll");
        const checkboxesNotAllKana = [...document.querySelectorAll("input[type='checkbox']")].slice(1);
        if (allKanaCheckbox.checked) {
            checkboxesNotAllKana.forEach(checkbox => checkbox.checked = true);
            setSelectedKana(selectedKana.concat(aLine, kaLine, saLine, taLine, naLine, maLine, haLine, yaLine, raLine,
                dakutenLine, combinationLine));
        } else {
            checkboxesNotAllKana.forEach(checkbox => checkbox.checked = false);
            setSelectedKana(doubleSounds);
        }
    }

    function selectNumber(e) {
        setMaxNumberOfWords(Number(e.target.value));
    }
    return (
        <>
            <p>Choose the kana you want to review:</p>
            <div className="allKana">
                <input id="selectAll" type="checkbox" onClick={() => selectAllKana()} />
                <label htmlFor="selectAll">{isHiragana ? "Select all hiragana" : "Select all katakana"}</label>
            </div>
            <div>
                <input id="aLine" type="checkbox" onClick={(e) => selectKana(e, aLine)} />
                <label htmlFor="aLine" lang="ja-jp">{isHiragana ? "あ a・い i・う u・え e・お o" : "ア a・イ i・ウ u・エ e・オ o"}</label>
            </div>
            <div>
                <input id="kaLine" type="checkbox" onClick={(e) => selectKana(e, kaLine)} />
                <label htmlFor="kaLine" lang="ja-jp">{isHiragana ? "か ka・き ki・く ku・け ke・こ ko" : "カ ka・キ ki・ク ku・ケ ke・コ ko"}</label>
            </div>

            <div>
                <input id="saLine" type="checkbox" onClick={(e) => selectKana(e, saLine)} />
                <label htmlFor="kaLine" lang="ja-jp">{isHiragana ? "さ sa・し shi・す su・せ se・そ so" : "サ sa・シ shi・ス su・セ se・ソ so"}</label>
            </div>

            <div>
                <input id="taLine" type="checkbox" onClick={(e) => selectKana(e, taLine)} />
                <label htmlFor="taLine" lang="ja-jp">{isHiragana ? "た ta・ち chi・つ tsu・て te・と to" : "タ ta・チ chi・ツ tsu・テ te・ト to"}</label>
            </div>

            <div>
                <input id="naLine" type="checkbox" onClick={(e) => selectKana(e, naLine)} />
                <label htmlFor="naLine" lang="ja-jp">{isHiragana ? "な na・に ni・ぬ nu・ね ne・の no" : "ナ na・ニ ni・ヌ nu・ネ ne・ノ no"}</label>
            </div>

            <div>
                <input id="haLine" type="checkbox" onClick={(e) => selectKana(e, haLine)} />
                <label htmlFor="haLine" lang="ja-jp">{isHiragana ? "は ha・ひ hi・ふ fu・へ he・ほ ho" : "ハ ha・ヒ hi・フ fu・ヘ he・ホ ho"}</label>
            </div>

            <div>
                <input id="maLine" type="checkbox" onClick={(e) => selectKana(e, maLine)} />
                <label htmlFor="maLine" lang="ja-jp">{isHiragana ? "ま ma・み mi・む mu・め me・も mo" : "マ ma・ミ mi・ム mu・メ me・モ mo"}</label>
            </div>
            <div>
                <input id="yaLine" type="checkbox" onClick={(e) => selectKana(e, yaLine)} />
                <label htmlFor="yaLine" lang="ja-jp">{isHiragana ? "や ya・ゆ yu・よ yo・わ wa・ん n" : "ヤ ya・ユ yu・ヨ yo・ワ wa・ン n"}</label>
            </div>

            <div>
                <input id="raLine" type="checkbox" onClick={(e) => selectKana(e, raLine)} />
                <label htmlFor="raLine" lang="ja-jp">{isHiragana ? "ら ra・り ri・る ru・れ re・ろ ro" : "ラ ra・リ ri・ル ru・レ re・ロ ro"}</label>
            </div>

            <div>
                <input id="dakutenLine" type="checkbox" onClick={(e) => selectKana(e, dakutenLine)} />
                <label htmlFor="dakutenLine">Dakuten kana</label>
            </div>

            <div>
                <input id="combinationLine" type="checkbox" onClick={(e) => selectKana(e, combinationLine)} />
                <label htmlFor="combinationLine">Combination kana</label>
            </div>

            <div>
                <label htmlFor="numberOfWords">Max number of words to review</label>
                <select id="numberOfWords" name="words" onChange={selectNumber}>
                    <option defaultValue="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                </select>
            </div>
        </>)
}

export default Settings;