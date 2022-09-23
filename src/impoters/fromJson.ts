import type { Importer } from "~/type.ts";

export const fromJson: Importer = (input) => {
  return JSON.parse(new TextDecoder().decode(input));
};
