import type { Exporter } from "~/type.ts";
import { OKURI_ARI_KEYWORD, OKURI_NASI_KEYWORD } from "~/constants.ts";
import { sortFn } from "../utils.ts";

export const toText: Exporter = (dict) => {
  const entries = dict.reduce<{
    okuriAriEntries: string[];
    okuriNasiEntries: string[];
  }>((acc, cur) => {
    let entry = "";

    entry += cur.source;
    entry += cur.okuri ?? "";
    entry += " /";

    for (const { text, annotations } of cur.candidates) {
      entry += text;

      if (annotations.length > 0) {
        for (const annotation of annotations) {
          entry += ";";
          entry += annotation;
        }
      }

      entry += "/";
    }

    acc[cur.okuri === null ? "okuriNasiEntries" : "okuriAriEntries"].push(
      entry,
    );

    return acc;
  }, { okuriAriEntries: [], okuriNasiEntries: [] });

  return new TextEncoder().encode(
    [
      OKURI_ARI_KEYWORD,
      ...entries.okuriAriEntries.sort((a, b) => -sortFn(a, b)),
      OKURI_NASI_KEYWORD,
      ...entries.okuriNasiEntries.sort((a, b) => +sortFn(a, b)),
    ].map((line) => line + "\n").join(""),
  );
};
