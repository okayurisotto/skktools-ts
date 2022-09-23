import { array, enums, object, optional, string } from "superstruct";
import { filetypes } from "~/CONSTANT.ts";

export const Args = object({
  _: array(string()),

  from: enums(filetypes),
  to: enums(filetypes),

  mode: enums(["convert", "expr", "sort", "uniq", "isolate"]),

  filename: optional(string()),
});
