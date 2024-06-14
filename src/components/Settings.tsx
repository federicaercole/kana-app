import { useEffect, useRef } from "react";
import Checkbox from "./Checkbox";
import { initialSounds, aLine, kaLine, saLine, taLine, naLine, haLine, maLine, yaLine, raLine, dakutenLine, combinationLine } from "../utils/syllabes";
import { Heading } from "./Heading";

interface Props {
    selectedKana: string[],
    setSelectedKana: React.Dispatch<React.SetStateAction<string[]>>,
    isHiragana: boolean,
    setMaxNumberOfWords: React.Dispatch<React.SetStateAction<number>>,
}

function Settings({ selectedKana, setSelectedKana, isHiragana, setMaxNumberOfWords }: Props) {
    document.title = "Choose the kana you want to review";
    const allKanaCheckbox = useRef<HTMLInputElement>(null!);
    const checkboxesNotAllKana = useRef<HTMLInputElement[]>([]);

    const setCheckboxesRef = (element: HTMLInputElement): void => {
        checkboxesNotAllKana.current = [...checkboxesNotAllKana.current, element];
    };

    useEffect(() => {
        if (checkboxesNotAllKana.current.every((checkbox) => checkbox.checked)) {
            allKanaCheckbox.current.checked = true;
        }
    });

    function selectKana(e: React.MouseEvent<HTMLInputElement>, line: string[]) {
        const target = e.target as HTMLInputElement;
        if (target.checked) {
            setSelectedKana(selectedKana.concat(line));
        } else {
            setSelectedKana(selectedKana.filter((item) => !line.includes(item)));
            allKanaCheckbox.current.checked = false;
        }
    }

    function selectAllKana() {
        if (allKanaCheckbox.current.checked) {
            checkboxesNotAllKana.current.forEach(checkbox => checkbox.checked = true);
            setSelectedKana(selectedKana.concat(aLine, kaLine, saLine, taLine, naLine, maLine, haLine, yaLine, raLine,
                dakutenLine, combinationLine));
        } else {
            checkboxesNotAllKana.current.forEach(checkbox => checkbox.checked = false);
            setSelectedKana(initialSounds);
        }
    }

    function selectNumber(e: React.ChangeEvent<HTMLSelectElement>) {
        setMaxNumberOfWords(Number(e.target.value));
    }
    return (
        <fieldset>
            <legend><Heading>Choose the kana you want to review</Heading></legend>

            <Checkbox innerRef={allKanaCheckbox} className="all-kana" id="select-all" onClick={selectAllKana} labelText={isHiragana ? "Select all hiragana" : "Select all katakana"} />
            <Checkbox innerRef={setCheckboxesRef} id="aLine" onClick={(e) => selectKana(e, aLine)} lang="ja" labelText={isHiragana ? "あ a - い i - う u - え e - お o" : "ア a - イ i - ウ u - エ e - オ o"} />
            <Checkbox innerRef={setCheckboxesRef} id="kaLine" onClick={(e) => selectKana(e, kaLine)} lang="ja" labelText={isHiragana ? "か ka - き ki - く ku - け ke - こ ko" : "カ ka - キ ki - ク ku - ケ ke - コ ko"} />
            <Checkbox innerRef={setCheckboxesRef} id="saLine" onClick={(e) => selectKana(e, saLine)} lang="ja" labelText={isHiragana ? "さ sa - し shi - す su - せ se - そ so" : "サ sa - シ shi - ス su - セ se - ソ so"} />
            <Checkbox innerRef={setCheckboxesRef} id="taLine" onClick={(e) => selectKana(e, taLine)} lang="ja" labelText={isHiragana ? "た ta - ち chi - つ tsu - て te - と to" : "タ ta - チ chi - ツ tsu - テ te - ト to"} />
            <Checkbox innerRef={setCheckboxesRef} id="naLine" onClick={(e) => selectKana(e, naLine)} lang="ja" labelText={isHiragana ? "な na - に ni - ぬ nu - ね ne - の no" : "ナ na - ニ ni - ヌ nu - ネ ne - ノ no"} />
            <Checkbox innerRef={setCheckboxesRef} id="haLine" onClick={(e) => selectKana(e, haLine)} lang="ja" labelText={isHiragana ? "は ha - ひ hi - ふ fu - へ he - ほ ho" : "ハ ha - ヒ hi - フ fu - ヘ he - ホ ho"} />
            <Checkbox innerRef={setCheckboxesRef} id="maLine" onClick={(e) => selectKana(e, maLine)} lang="ja" labelText={isHiragana ? "ま ma - み mi - む mu - め me - も mo" : "マ ma - ミ mi - ム mu - メ me - モ mo"} />
            <Checkbox innerRef={setCheckboxesRef} id="yaLine" onClick={(e) => selectKana(e, yaLine)} lang="ja" labelText={isHiragana ? "や ya - ゆ yu - よ yo - わ wa - ん n" : "ヤ ya - ユ yu - ヨ yo - ワ wa - ン n"} />
            <Checkbox innerRef={setCheckboxesRef} id="raLine" onClick={(e) => selectKana(e, raLine)} lang="ja" labelText={isHiragana ? "ら ra - り ri - る ru - れ re - ろ ro" : "ラ ra - リ ri - ル ru - レ re - ロ ro"} />
            <Checkbox innerRef={setCheckboxesRef} id="dakutenLine" onClick={(e) => selectKana(e, dakutenLine)} labelText="Dakuten kana" />
            <Checkbox innerRef={setCheckboxesRef} id="combinationLine" onClick={(e) => selectKana(e, combinationLine)} labelText={isHiragana ? "Combination kana" : "Combination kana and extended katakana (ファ fa - ディ di...)"} />

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