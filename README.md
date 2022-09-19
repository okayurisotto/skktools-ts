# skktools-ts

## 走り書き

- `deno run ./src/main.js`して使う
- データは基本的に標準入力から入れる
  - データの種類は`--from`によって、`json | text | yaml`から指定する
- データは基本的に標準出力へ出される
  - 出力するデータの種類は`--to`によって、`json | text | yaml`から指定する
- 動作は`--mode`で切り替える
  - `convert`
    - データの種類を変換するだけ
  - `expr`
    - ファイルを足し引きする
    - 標準入力からは受け取らず、オプション名なしのコマンドライン引数をファイル名として受け取る
    - `skkdic-expr`のようにして使う
    - 遅い
  - `sort`
    - エントリを並び換えるだけ
  - `uniq`
    - 重複の統合や自動修正可能な程度の誤りの修正を行う
    - 魔窟
  - `isolate`
    - 接頭辞エントリや接尾辞エントリや数値変換エントリを隔離する
    - 多分そうそう使わない

```examples.sh
$ deno run --unstable ./src/main.js --from text --to json --mode convert < SKK-JISYO.L.txt > SKK-JISYO.L.json

$ deno run --unstable ./src/main.js --from json --to json --mode sort < SKK-JISYO.L.json > SKK-JISYO.L.json@new

$ deno run --unstable --allow-read ./src/main.js --from json --to json --mode expr -- JISYO_1 + JISYO_2 - WRONG_JISYO
```
