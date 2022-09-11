import type { Dictionary } from "../type";

export const getSuffixEntries = (dict: Dictionary): Dictionary => {
  return dict.filter((entry) => {
    if (entry.source.startsWith(">")) {
      return true;
    }
    return false;
  });
};
