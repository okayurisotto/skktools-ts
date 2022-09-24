# skktools-ts

## 概要

SKK辞書を管理するときに便利なツールです。`skk-dev/skktools`に影響を受けています。

## 導入方法

`skk-dev/skktools`と違い、`skktools-ts`はBusyBox的に、いくつかの機能を1つのコマンドで提供します。

下記コマンドを実行することで、`~/.deno/bin`に`skktools-ts`としてインストールできます。

```
deno task install
```

## 使用方法

データは基本的に標準入力から入れます。データの種類は`from`オプションによって、`json | text | yaml | msgpack`から指定します。これはそれぞれ、JSON形式、従来のプレーンテキスト形式、YAML形式、[MessagePack](https://msgpack.org/)形式です。

データは基本的に標準出力へ出されます。出力するデータの種類は`to`オプションによって、`json | text | yaml | msgpack`から指定します。

動作は`mode`オプションで切り替えます。対応している`mode`オプションの値は以下です。

- `convert`
  - データの種類を変換します。それ以上のことはしません。
  - 変換は他のモードでも自動的に行われます。
- `sort`
  - エントリの並び換えを行います。
- `uniq`
  - 重複の統合や自動修正可能な程度の誤りの修正を行います。
  - 出力はすでに並び替えられているため、`sort`を追加で実行する必要はありません。
- `expr`
  - 辞書の足し引きを行います。
  - **データは標準入力からは受け取らず**、オプション名なしのコマンドライン引数をファイル名として受け取ります。
    - `skkdic-expr`のようにして使います。
  - **`uniq`を追加で実行する必要があります**。

## コマンド例

```sh
$ skktools-ts --from text --to json --mode convert \
  < SKK-JISYO.L.txt \
  > SKK-JISYO.L.json

$ skktools-ts --from json --to json --mode sort \
  < SKK-JISYO.L.json \
  > SKK-JISYO.L.json@new

$ skktools-ts --from json --to json --mode expr \
  -- SKK-JISYO.L.json + SKK-JISYO.assoc.json - SKK-JISYO.wrong.json \
  > SKK-JISYO.json
```

## 備考

- MessagePack形式（`msgpack`）の読み書きが最も高速で、YAML形式（`yaml`）が最も低速です。
- `concat`によるエスケープは行いません。
