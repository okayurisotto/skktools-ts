import type { Dictionary, Filetype } from "../../type";
import { toJson } from "./toJson";
import { toText } from "./toText";
import { toYaml } from "./toYaml";

export const exporters = new Map<Filetype, (input: Dictionary) => string>([
  ["json", toJson],
  ["text", toText],
  ["yaml", toYaml],
]);
