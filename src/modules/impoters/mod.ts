import type { Dictionary, Filetype } from "../../type";
import { fromJson } from "./fromJson";
import { fromText } from "./fromText";
import { fromYaml } from "./fromYaml";

export const importers = new Map<Filetype, (input: string) => Dictionary>([
  ["json", fromJson],
  ["text", fromText],
  ["yaml", fromYaml],
]);
