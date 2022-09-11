import type { Dictionary } from "../../type";

export const fromJson = (dict: string): Dictionary => {
  return JSON.parse(dict);
};
