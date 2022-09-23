import type { Exporter, Filetype } from "~/type.ts";
import { toJson } from "./toJson.ts";
import { toText } from "./toText.ts";
import { toYaml } from "./toYaml.ts";

export const exporters: Record<Filetype, Exporter> = {
  json: toJson,
  text: toText,
  yaml: toYaml,
};
