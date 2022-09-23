import type { Exporter } from "~/type.ts";

export const toJson: Exporter = (dict) => {
  return new TextEncoder().encode(
    JSON.stringify(dict, undefined, 2) + "\n",
  );
};
