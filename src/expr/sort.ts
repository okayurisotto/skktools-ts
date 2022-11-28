import type { Dictionary } from "~/type.ts";
import { sortFn } from "~/utils.ts";

export const sort = (dict: Dictionary): Dictionary => {
  return dict.sort((a, b) => {
    const source = sortFn(a.source, b.source);
    if (source !== 0) return source;

    if (a.okuri === null) {
      if (b.okuri === null) {
        return 0;
      } else {
        return -1;
      }
    } else {
      if (b.okuri === null) {
        return +1;
      } else {
        return sortFn(a.okuri, b.okuri);
      }
    }
  });
};
