import type { Dictionary } from "~/type.ts";
import { sortFn } from "~/utils.ts";

export const sort = (dict: Dictionary): Dictionary => {
  return dict.sort((a, b) => {
    if (a.source > b.source) {
      return +1;
    }
    if (a.source < b.source) {
      return -1;
    }

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
