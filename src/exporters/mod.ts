import type { Dictionary, Filetype } from "~/type.ts";
import { toJson } from "./toJson.ts";
import { toText } from "./toText.ts";
import { toYaml } from "./toYaml.ts";

export const exporters: Record<Filetype, (input: Dictionary) => string> = {
  json: toJson,
  text: toText,
  yaml: toYaml,
};
