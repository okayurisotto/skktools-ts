import type { Dictionary } from "~/type.ts";

export const getPrefixEntries = (dict: Dictionary): Dictionary => {
  return dict.filter((entry) => {
    if (entry.okuri === null && entry.source.endsWith(">")) {
      return true;
    }
    return false;
  });
};
