import type { Dictionary } from "~/type.ts";
import * as YAML from "yaml";

export const toYaml = (dict: Dictionary): string => {
  return YAML.stringify(dict, {
    defaultKeyType: "PLAIN",
    defaultStringType: "QUOTE_DOUBLE",
  });
};
