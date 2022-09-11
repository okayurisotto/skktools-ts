import type { Dictionary } from "../../type";
import { YAML } from "zx";

export const fromYaml = (dict: string): Dictionary => {
  return YAML.parse(dict);
};
