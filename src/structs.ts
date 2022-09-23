import { array, enums, literal, object, string } from "superstruct";
import { filetypes } from "~/CONSTANT.ts";

const base = {
  _: array(string()),

  from: enums(filetypes),
  to: enums(filetypes),
};

export const ConvertArgs = object({
  ...base,
  mode: literal("convert"),
});

export const ExprArgs = object({
  ...base,
  mode: literal("expr"),
});

export const SortArgs = object({
  ...base,
  mode: literal("sort"),
});

export const UniqArgs = object({
  ...base,
  mode: literal("uniq"),
});

export const IsolateArgs = object({
  ...base,
  mode: literal("isolate"),
  filename: string(),
});
