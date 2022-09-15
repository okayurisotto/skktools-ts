import type { Dictionary } from "~/type.ts";
import * as YAML from "npm:yaml";

export const fromYaml = (dict: string): Dictionary => {
  return YAML.parse(dict);
};
