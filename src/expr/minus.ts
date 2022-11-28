import type { Dictionary } from "~/type.ts";

export const minus = (left: Dictionary, right: Dictionary): Dictionary => {
  return left.map((a) => {
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
  });
};
