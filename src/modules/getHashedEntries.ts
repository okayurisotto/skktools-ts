import type { Dictionary } from "../type";
import { hashPatterns } from "../CONSTANT";

export const getHashedEntries = (entries: Dictionary): Dictionary => {
  return entries
    .filter(({ source }) => (source.includes("#")))
    .map((entry) => ({
      ...entry,
      candidates: entry.candidates.filter(({ text }) => {
        return hashPatterns.some((pattern) => text.includes(pattern));
      }),
    }))
    .filter(({ candidates }) => candidates.length > 0);
};
