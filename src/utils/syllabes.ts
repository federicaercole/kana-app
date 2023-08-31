const initialSounds = ["-a", "-i", "-u", "-e", "-o", "-t", "-k", "-p", "-c", "-s", "-g"];

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
    "hya", "hyu", "hyo", "bya", "byu", "byo", "pya", "pyu", "pyo", "ti", "tu", "she",
    "je", "che", "wi", "we", "wo", "fa", "fi", "fe", "fo", "va", "vi", "vu", "ve", "vo", "di", "du"];

const totalKana = aLine.length + kaLine.length + saLine.length + taLine.length + naLine.length + haLine.length +
    maLine.length + yaLine.length + raLine.length + dakutenLine.length + combinationLine.length;

export { initialSounds, aLine, kaLine, saLine, taLine, naLine, haLine, maLine, yaLine, raLine, dakutenLine, combinationLine, totalKana };    