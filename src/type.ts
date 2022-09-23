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
