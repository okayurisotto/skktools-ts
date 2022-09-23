import type { Importer } from "~/type.ts";
import * as YAML from "yaml";

export const fromYaml: Importer = (input) => {
  return YAML.parse(new TextDecoder().decode(input));
};
