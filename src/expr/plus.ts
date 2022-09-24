import type { Dictionary } from "~/type.ts";

export const plus = (...dicts: Dictionary[]): Dictionary => {
  const [left, right, ...others] = dicts;
  if (left === undefined) throw Error();
  if (right === undefined) throw Error();
  if (others.length !== 0) return plus(plus(left, right), ...others);

  return [...left, ...right];
};
