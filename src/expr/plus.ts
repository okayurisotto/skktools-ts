import type { Dictionary } from "~/type.ts";

export const plus = (left: Dictionary, right: Dictionary): Dictionary => {
  return [...left, ...right];
};
