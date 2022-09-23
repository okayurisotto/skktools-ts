import type { Dictionary } from "~/type.ts";

export const minus = (...dicts: Dictionary[]): Dictionary => {
  const [left, right, ...others] = dicts;
  if (left === undefined) throw Error();
  if (right === undefined) throw Error();
  if (others.length !== 0) return minus(minus(left, right), ...others);

  return left
    .map((a) => {
      return {
        ...a,
        candidates: a.candidates.filter(({ text: aText }) => {
          return right.every((b) => {
            if (a.source !== b.source) return true;
            if (a.okuri !== b.okuri) return true;
            return b.candidates.every(({ text: bText }) => {
              if (aText !== bText) return true;
              return false;
            });
          });
        }),
      };
    })
    .filter(({ candidates }) => candidates.length > 0);
};
