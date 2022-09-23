import type { Dictionary } from "~/type.ts";
import { OKURI_ARI_KEYWORD, OKURI_NASI_KEYWORD } from "~/constants.ts";

export const fromText = (dict: string): Dictionary => {
  return dict
    .split("\n")
    .reduce<{
      entries: Dictionary;
      okuriAri: null | boolean;
    }>((acc, cur) => {
      if (cur === OKURI_ARI_KEYWORD) {
        acc.okuriAri = true;
        return acc;
      }

      if (cur === OKURI_NASI_KEYWORD) {
        acc.okuriAri = false;
        return acc;
      }

      if (cur.trim() === "") {
        return acc;
      }
      if (cur.startsWith(";")) {
        return acc;
      }
      if (acc.okuriAri === null) {
        return acc;
      }

      const [, left, right] = cur.match(/^(\S+?) \/(.+?)\/$/) ?? [];
      if (left === undefined) {
        throw Error(`left:\t${cur}`);
      }
      if (right === undefined) {
        throw Error(`right:\t${cur}`);
      }

      const [, source, okuri] = (() => {
        if (acc.okuriAri) {
          return left.match(/^(\S+?)([a-z])$/) ?? [];
        } else {
          return [, left, null];
        }
      })();
      if (source === undefined) {
        throw Error(`source:\t${cur}`);
      }
      if (okuri === undefined) {
        throw Error(`okuri:\t${cur}`);
      }

      const candidates = right.split("/")
        .map((part) => part.split(";"))
        .map(([text, ...annotations]) => {
          if (text === undefined) {
            throw Error(`text:\t${cur}`);
          }
          return { text, annotations };
        });

      acc.entries.push({ source, okuri, candidates });

      return acc;
    }, { entries: [], okuriAri: null })
    .entries;
};
