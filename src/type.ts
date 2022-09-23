import type { filetypes } from "~/constants.ts";

export type Filetype = typeof filetypes[number];

export type Dictionary = DictionaryEntry[];

export type DictionaryEntry = {
  source: string;
  okuri: null | string;
  candidates: DictionaryCandidate[];
};

export type DictionaryCandidate = {
  text: string;
  annotations: string[];
};

export type Importer = (input: Uint8Array) => Dictionary;

export type Exporter = (input: Dictionary) => Uint8Array;
