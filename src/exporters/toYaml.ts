import type { Exporter } from "~/type.ts";
import * as YAML from "npm:yaml";

export const toYaml: Exporter = (output) => {
  return new TextEncoder().encode(
    YAML.stringify(output, {
      defaultKeyType: "PLAIN",
      defaultStringType: "QUOTE_DOUBLE",
    }),
  );
};
