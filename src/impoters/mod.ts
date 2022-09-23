import type { Filetype, Importer } from "~/type.ts";
import { fromJson } from "./fromJson.ts";
import { fromText } from "./fromText.ts";
import { fromYaml } from "./fromYaml.ts";

export const importers: Record<Filetype, Importer> = {
  json: fromJson,
  text: fromText,
  yaml: fromYaml,
};
