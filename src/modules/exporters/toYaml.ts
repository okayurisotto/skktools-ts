import type { Dictionary } from "../../type";
import { YAML } from "zx";

export const toYaml = (dict: Dictionary): string => {
  return YAML.stringify(dict, {
    defaultKeyType: "PLAIN",
    defaultStringType: "QUOTE_DOUBLE",
  });
};
