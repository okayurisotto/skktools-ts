import type { Dictionary, Filetype } from "~/type.ts";
import { fromJson } from "./fromJson.ts";
import { fromText } from "./fromText.ts";
import { fromYaml } from "./fromYaml.ts";

export const importers = new Map<Filetype, (input: string) => Dictionary>([
  ["json", fromJson],
  ["text", fromText],
  ["yaml", fromYaml],
]);
