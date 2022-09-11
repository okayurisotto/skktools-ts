import type { Dictionary, DictionaryCandidate } from "../type";
import { chars, hira_kata, latin_widelatin } from "../CONSTANT";
import { sort } from "./sort";

export const uniq = (dict: Dictionary): Dictionary => {
  return sort(
    dict.filter(({ source }) => {
      return [...source].every((char) => {
        return chars.includes(char);
      });
    })
  )
    .reduce<Dictionary>((acc, cur) => {
      const prev = acc[acc.length - 1];
      if (
        prev !== undefined &&
        prev.source === cur.source &&
        prev.okuri === cur.okuri
      ) {
        prev.candidates.push(...cur.candidates);
      } else {
        acc.push(cur);
      }

      return acc;
    }, [])
    .map((entry) => ({
      ...entry,
      candidates: entry.candidates
        .filter(({ text }) => {
          return entry.source !== text;
        })
        .filter(({ text }) => {
          return entry.source.toLowerCase() !== text.toLowerCase();
        })
        .filter(({ text }) => {
          if (entry.okuri !== null) return true;

          const latins = [...text].map((a) => {
            return latin_widelatin.find(({ widelatin: b }) => a === b)?.latin;
          });

          if (latins.includes(undefined)) return true;
          if (entry.source.toLowerCase() === latins.join("").toLowerCase()) {
            return false;
          }
          return true;
        })
        .filter(({ text }) => {
          if (entry.okuri !== null) return true;

          const widelatins = [...entry.source].map((a) => {
            return latin_widelatin.find(({ latin: b }) => a === b)?.widelatin;
          });

          if (widelatins.includes(undefined)) return true;
          if (text === widelatins.join("")) return false;
          return true;
        })
        .filter(({ text }) => {
          if (entry.okuri !== null) return true;

          const katas = [...entry.source].map((a) => {
            return hira_kata.find(({ hira: b }) => a === b)?.kata;
          });

          if (katas.includes(undefined)) return true;
          if (text === katas.join("")) return false;
          return true;
        })
        .reduce<DictionaryCandidate[]>((acc, cur, idx, src) => {
          if (idx === src.findIndex((v) => cur.text === v.text)) {
            acc.push(cur);
            return acc;
          } else {
            const prev = acc.find((v) => cur.text === v.text);
            if (prev) {
              prev.annotations = [
                ...new Set([...prev.annotations, ...cur.annotations]),
              ];
            } else {
              throw Error();
            }
          }

          return acc;
        }, []),
    }))
    .filter(({ candidates }) => candidates.length > 0);
};
