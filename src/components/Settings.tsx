import { useEffect } from "react";
import Checkbox from "./Checkbox";
import { initialSounds, aLine, kaLine, saLine, taLine, naLine, haLine, maLine, yaLine, raLine, dakutenLine, combinationLine } from "../utils/syllabes";

interface Props {
    selectedKana: string[],
    setSelectedKana: React.Dispatch<React.SetStateAction<string[]>>,
    isHiragana: boolean,
    setMaxNumberOfWords: React.Dispatch<React.SetStateAction<number>>
}

function Settings({ selectedKana, setSelectedKana, isHiragana, setMaxNumberOfWords }: Props) {
    document.title = "Choose the kana you want to review";

    useEffect(() => {
        const allKanaCheckbox = document.querySelector("#select-all") as HTMLInputElement;
        const checkboxesNotAllKana = [...document.querySelectorAll("input[type='checkbox']")].slice(1) as HTMLInputElement[];
        if (checkboxesNotAllKana.every((checkbox) => checkbox.checked)) {
            allKanaCheckbox.checked = true;
        }
    });

    function selectKana(e: React.MouseEvent<HTMLInputElement>, line: string[]) {
        const allKanaCheckbox = document.querySelector("#select-all") as HTMLInputElement;
        const target = e.target as HTMLInputElement;
        if (target.checked) {
            setSelectedKana(selectedKana.concat(line));
        } else {
            setSelectedKana(selectedKana.filter((item) => !line.includes(item)));
            allKanaCheckbox.checked = false;
        }
    }

    function selectAllKana() {
        const allKanaCheckbox = document.querySelector("#select-all") as HTMLInputElement;
        const checkboxesNotAllKana = [...document.querySelectorAll("input[type='checkbox']")].slice(1) as HTMLInputElement[];
        if (allKanaCheckbox.checked) {
            checkboxesNotAllKana.forEach(checkbox => checkbox.checked = true);
            setSelectedKana(selectedKana.concat(aLine, kaLine, saLine, taLine, naLine, maLine, haLine, yaLine, raLine,
                dakutenLine, combinationLine));
        } else {
            checkboxesNotAllKana.forEach(checkbox => checkbox.checked = false);
            setSelectedKana(initialSounds);
        }
    }

    function selectNumber(e: React.ChangeEvent<HTMLSelectElement>) {
        setMaxNumberOfWords(Number(e.target.value));
    }
    return (
        <fieldset>
            <legend><h1 tabIndex={-1}>Choose the kana you want to review</h1></legend>

            <Checkbox className="all-kana" id="select-all" onClick={selectAllKana} labelText={isHiragana ? "Select all hiragana" : "Select all katakana"} />
            <Checkbox id="aLine" onClick={(e) => selectKana(e, aLine)} lang="ja" labelText={isHiragana ? "あ a - い i - う u - え e - お o" : "ア a - イ i - ウ u - エ e - オ o"} />
            <Checkbox id="kaLine" onClick={(e) => selectKana(e, kaLine)} lang="ja" labelText={isHiragana ? "か ka - き ki - く ku - け ke - こ ko" : "カ ka - キ ki - ク ku - ケ ke - コ ko"} />
            <Checkbox id="saLine" onClick={(e) => selectKana(e, saLine)} lang="ja" labelText={isHiragana ? "さ sa - し shi - す su - せ se - そ so" : "サ sa - シ shi - ス su - セ se - ソ so"} />
            <Checkbox id="taLine" onClick={(e) => selectKana(e, taLine)} lang="ja" labelText={isHiragana ? "た ta - ち chi - つ tsu - て te - と to" : "タ ta - チ chi - ツ tsu - テ te - ト to"} />
            <Checkbox id="naLine" onClick={(e) => selectKana(e, naLine)} lang="ja" labelText={isHiragana ? "な na - に ni - ぬ nu - ね ne - の no" : "ナ na - ニ ni - ヌ nu - ネ ne - ノ no"} />
            <Checkbox id="haLine" onClick={(e) => selectKana(e, haLine)} lang="ja" labelText={isHiragana ? "は ha - ひ hi - ふ fu - へ he - ほ ho" : "ハ ha - ヒ hi - フ fu - ヘ he - ホ ho"} />
            <Checkbox id="maLine" onClick={(e) => selectKana(e, maLine)} lang="ja" labelText={isHiragana ? "ま ma - み mi - む mu - め me - も mo" : "マ ma - ミ mi - ム mu - メ me - モ mo"} />
            <Checkbox id="yaLine" onClick={(e) => selectKana(e, yaLine)} lang="ja" labelText={isHiragana ? "や ya - ゆ yu - よ yo - わ wa - ん n" : "ヤ ya - ユ yu - ヨ yo - ワ wa - ン n"} />
            <Checkbox id="raLine" onClick={(e) => selectKana(e, raLine)} lang="ja" labelText={isHiragana ? "ら ra - り ri - る ru - れ re - ろ ro" : "ラ ra - リ ri - ル ru - レ re - ロ ro"} />
            <Checkbox id="dakutenLine" onClick={(e) => selectKana(e, dakutenLine)} labelText="Dakuten kana" />
            <Checkbox id="combinationLine" onClick={(e) => selectKana(e, combinationLine)} labelText={isHiragana ? "Combination kana" : "Combination kana and extended katakana (ファ fa - ディ di...)"} />

            <div className="selection-number">
                <label htmlFor="number-of-words">Max number of words to review</label>
                <select id="number-of-words" name="words" onChange={selectNumber}>
                    <option defaultValue="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                </select>
            </div>
        </fieldset>)
}

export default Settings;