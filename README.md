# skktools-ts

## 走り書き

- `make all`で`./dist/main.js`にビルドされる
- `node ./dist/main.js`して使う
- データは基本的に標準入力から入れる
  - データのタイプは`--from`によって、`json | text | yaml`から指定する
- データは基本的に標準出力へ出される
  - 出力するデータのタイプは`--to`によって、`json | text | yaml`から指定する
- 動作は`--mode`で切り替える
  - `convert`
    - データのタイプを変換するだけ
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
$ node ./dist/main.js --from text --to json --mode convert < SKK-JISYO.L.txt > SKK-JISYO.L.json

$ node ./dist/main.js --from json --to json --mode sort < SKK-JISYO.L.json > SKK-JISYO.L.json@new

$ node ./dist/main.js --from json --to json --mode expr -- JISYO_1 + JISYO_2 - WRONG_JISYO
```
