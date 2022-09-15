import type { Dictionary } from "~/type.ts";

export const fromJson = (dict: string): Dictionary => {
  return JSON.parse(dict);
};
