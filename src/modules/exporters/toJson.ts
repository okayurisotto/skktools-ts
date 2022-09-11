import type { Dictionary } from "../../type";

export const toJson = (dict: Dictionary): string => {
  return JSON.stringify(dict, undefined, 2);
};
