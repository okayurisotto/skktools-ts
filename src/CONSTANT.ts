import { range } from "~/modules/utils.ts";

export const OKURI_ARI_KEYWORD = ";; okuri-ari entries.";

export const OKURI_NASI_KEYWORD = ";; okuri-nasi entries.";

export const hashPatterns = [...range({ start: 0, stop: 10 })].map(
  (num) => `#${num}`
);

export const filetypes = ["json", "yaml", "text"] as const;

export const latin_widelatin = [
  { latin: "!", widelatin: "！" },
  { latin: '"', widelatin: "＂" },
  { latin: "#", widelatin: "＃" },
  { latin: "$", widelatin: "＄" },
  { latin: "%", widelatin: "％" },
  { latin: "&", widelatin: "＆" },
  { latin: "'", widelatin: "＇" },
  { latin: "(", widelatin: "（" },
  { latin: ")", widelatin: "）" },
  { latin: "*", widelatin: "＊" },
  { latin: "+", widelatin: "＋" },
  { latin: ",", widelatin: "，" },
  { latin: "-", widelatin: "－" },
  { latin: ".", widelatin: "．" },
  { latin: "/", widelatin: "／" },
  { latin: "0", widelatin: "０" },
  { latin: "1", widelatin: "１" },
  { latin: "2", widelatin: "２" },
  { latin: "3", widelatin: "３" },
  { latin: "4", widelatin: "４" },
  { latin: "5", widelatin: "５" },
  { latin: "6", widelatin: "６" },
  { latin: "7", widelatin: "７" },
  { latin: "8", widelatin: "８" },
  { latin: "9", widelatin: "９" },
  { latin: ":", widelatin: "：" },
  { latin: ";", widelatin: "；" },
  { latin: "<", widelatin: "＜" },
  { latin: "=", widelatin: "＝" },
  { latin: ">", widelatin: "＞" },
  { latin: "?", widelatin: "？" },
  { latin: "@", widelatin: "＠" },
  { latin: "A", widelatin: "Ａ" },
  { latin: "B", widelatin: "Ｂ" },
  { latin: "C", widelatin: "Ｃ" },
  { latin: "D", widelatin: "Ｄ" },
  { latin: "E", widelatin: "Ｅ" },
  { latin: "F", widelatin: "Ｆ" },
  { latin: "G", widelatin: "Ｇ" },
  { latin: "H", widelatin: "Ｈ" },
  { latin: "I", widelatin: "Ｉ" },
  { latin: "J", widelatin: "Ｊ" },
  { latin: "K", widelatin: "Ｋ" },
  { latin: "L", widelatin: "Ｌ" },
  { latin: "M", widelatin: "Ｍ" },
  { latin: "N", widelatin: "Ｎ" },
  { latin: "O", widelatin: "Ｏ" },
  { latin: "P", widelatin: "Ｐ" },
  { latin: "Q", widelatin: "Ｑ" },
  { latin: "R", widelatin: "Ｒ" },
  { latin: "S", widelatin: "Ｓ" },
  { latin: "T", widelatin: "Ｔ" },
  { latin: "U", widelatin: "Ｕ" },
  { latin: "V", widelatin: "Ｖ" },
  { latin: "W", widelatin: "Ｗ" },
  { latin: "X", widelatin: "Ｘ" },
  { latin: "Y", widelatin: "Ｙ" },
  { latin: "Z", widelatin: "Ｚ" },
  { latin: "[", widelatin: "［" },
  { latin: "\\", widelatin: "＼" },
  { latin: "]", widelatin: "］" },
  { latin: "^", widelatin: "＾" },
  { latin: "_", widelatin: "＿" },
  { latin: "`", widelatin: "｀" },
  { latin: "a", widelatin: "ａ" },
  { latin: "b", widelatin: "ｂ" },
  { latin: "c", widelatin: "ｃ" },
  { latin: "d", widelatin: "ｄ" },
  { latin: "e", widelatin: "ｅ" },
  { latin: "f", widelatin: "ｆ" },
  { latin: "g", widelatin: "ｇ" },
  { latin: "h", widelatin: "ｈ" },
  { latin: "i", widelatin: "ｉ" },
  { latin: "j", widelatin: "ｊ" },
  { latin: "k", widelatin: "ｋ" },
  { latin: "l", widelatin: "ｌ" },
  { latin: "m", widelatin: "ｍ" },
  { latin: "n", widelatin: "ｎ" },
  { latin: "o", widelatin: "ｏ" },
  { latin: "p", widelatin: "ｐ" },
  { latin: "q", widelatin: "ｑ" },
  { latin: "r", widelatin: "ｒ" },
  { latin: "s", widelatin: "ｓ" },
  { latin: "t", widelatin: "ｔ" },
  { latin: "u", widelatin: "ｕ" },
  { latin: "v", widelatin: "ｖ" },
  { latin: "w", widelatin: "ｗ" },
  { latin: "x", widelatin: "ｘ" },
  { latin: "y", widelatin: "ｙ" },
  { latin: "z", widelatin: "ｚ" },
  { latin: "{", widelatin: "｛" },
  { latin: "|", widelatin: "｜" },
  { latin: "}", widelatin: "｝" },
  { latin: "~", widelatin: "～" },
];

export const hira_kata = [
  { hira: "、", kata: "、" },
  { hira: "。", kata: "。" },
  { hira: "ぁ", kata: "ァ" },
  { hira: "あ", kata: "ア" },
  { hira: "ぃ", kata: "ィ" },
  { hira: "い", kata: "イ" },
  { hira: "ぅ", kata: "ゥ" },
  { hira: "う", kata: "ウ" },
  { hira: "ぇ", kata: "ェ" },
  { hira: "え", kata: "エ" },
  { hira: "ぉ", kata: "ォ" },
  { hira: "お", kata: "オ" },
  { hira: "か", kata: "カ" },
  { hira: "が", kata: "ガ" },
  { hira: "き", kata: "キ" },
  { hira: "ぎ", kata: "ギ" },
  { hira: "く", kata: "ク" },
  { hira: "ぐ", kata: "グ" },
  { hira: "け", kata: "ケ" },
  { hira: "げ", kata: "ゲ" },
  { hira: "こ", kata: "コ" },
  { hira: "ご", kata: "ゴ" },
  { hira: "さ", kata: "サ" },
  { hira: "ざ", kata: "ザ" },
  { hira: "し", kata: "シ" },
  { hira: "じ", kata: "ジ" },
  { hira: "す", kata: "ス" },
  { hira: "ず", kata: "ズ" },
  { hira: "せ", kata: "セ" },
  { hira: "ぜ", kata: "ゼ" },
  { hira: "そ", kata: "ソ" },
  { hira: "ぞ", kata: "ゾ" },
  { hira: "た", kata: "タ" },
  { hira: "だ", kata: "ダ" },
  { hira: "ち", kata: "チ" },
  { hira: "ぢ", kata: "ヂ" },
  { hira: "っ", kata: "ッ" },
  { hira: "つ", kata: "ツ" },
  { hira: "づ", kata: "ヅ" },
  { hira: "て", kata: "テ" },
  { hira: "で", kata: "デ" },
  { hira: "と", kata: "ト" },
  { hira: "ど", kata: "ド" },
  { hira: "な", kata: "ナ" },
  { hira: "に", kata: "ニ" },
  { hira: "ぬ", kata: "ヌ" },
  { hira: "ね", kata: "ネ" },
  { hira: "の", kata: "ノ" },
  { hira: "は", kata: "ハ" },
  { hira: "ば", kata: "バ" },
  { hira: "ぱ", kata: "パ" },
  { hira: "ひ", kata: "ヒ" },
  { hira: "び", kata: "ビ" },
  { hira: "ぴ", kata: "ピ" },
  { hira: "ふ", kata: "フ" },
  { hira: "ぶ", kata: "ブ" },
  { hira: "ぷ", kata: "プ" },
  { hira: "へ", kata: "ヘ" },
  { hira: "べ", kata: "ベ" },
  { hira: "ぺ", kata: "ペ" },
  { hira: "ほ", kata: "ホ" },
  { hira: "ぼ", kata: "ボ" },
  { hira: "ぽ", kata: "ポ" },
  { hira: "ま", kata: "マ" },
  { hira: "み", kata: "ミ" },
  { hira: "む", kata: "ム" },
  { hira: "め", kata: "メ" },
  { hira: "も", kata: "モ" },
  { hira: "ゃ", kata: "ャ" },
  { hira: "や", kata: "ヤ" },
  { hira: "ゅ", kata: "ュ" },
  { hira: "ゆ", kata: "ユ" },
  { hira: "ょ", kata: "ョ" },
  { hira: "よ", kata: "ヨ" },
  { hira: "ら", kata: "ラ" },
  { hira: "り", kata: "リ" },
  { hira: "る", kata: "ル" },
  { hira: "れ", kata: "レ" },
  { hira: "ろ", kata: "ロ" },
  { hira: "ゎ", kata: "ヮ" },
  { hira: "わ", kata: "ワ" },
  { hira: "ゐ", kata: "ヰ" },
  { hira: "ゑ", kata: "ヱ" },
  { hira: "を", kata: "ヲ" },
  { hira: "ん", kata: "ン" },
  { hira: "ゔ", kata: "ヴ" },
  { hira: "ゕ", kata: "ヵ" },
  { hira: "ゖ", kata: "ヶ" },
  { hira: "゛", kata: "゛" },
  { hira: "・", kata: "・" },
  { hira: "ー", kata: "ー" },
  { hira: "！", kata: "！" },
  { hira: "＃", kata: "＃" },
  { hira: "＄", kata: "＄" },
  { hira: "％", kata: "％" },
  { hira: "＆", kata: "＆" },
  { hira: "＇", kata: "＇" },
  { hira: "（", kata: "（" },
  { hira: "）", kata: "）" },
  { hira: "＊", kata: "＊" },
  { hira: "＋", kata: "＋" },
  { hira: "，", kata: "，" },
  { hira: "－", kata: "－" },
  { hira: "．", kata: "．" },
  { hira: "／", kata: "／" },
  { hira: "０", kata: "０" },
  { hira: "１", kata: "１" },
  { hira: "２", kata: "２" },
  { hira: "３", kata: "３" },
  { hira: "４", kata: "４" },
  { hira: "５", kata: "５" },
  { hira: "６", kata: "６" },
  { hira: "７", kata: "７" },
  { hira: "８", kata: "８" },
  { hira: "９", kata: "９" },
  { hira: "：", kata: "：" },
  { hira: "；", kata: "；" },
  { hira: "＜", kata: "＜" },
  { hira: "＝", kata: "＝" },
  { hira: "＞", kata: "＞" },
  { hira: "？", kata: "？" },
  { hira: "＠", kata: "＠" },
  { hira: "＼", kata: "＼" },
  { hira: "］", kata: "］" },
  { hira: "＾", kata: "＾" },
  { hira: "＿", kata: "＿" },
  { hira: "｀", kata: "｀" },
  { hira: "｛", kata: "｛" },
  { hira: "｜", kata: "｜" },
  { hira: "｝", kata: "｝" },
  { hira: "～", kata: "～" },
  { hira: '「', kata: "「" },
  { hira: '」', kata: "」" },
  { hira: '＂', kata: "＂" },
];

export const chars = [
  ...latin_widelatin.map(({ latin }) => latin),
  ...hira_kata.map(({ hira }) => hira),
];
