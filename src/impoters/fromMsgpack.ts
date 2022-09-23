import type { Dictionary, Importer } from "~/type.ts";
import { decode } from "@msgpack/msgpack";

export const fromMsgpack: Importer = (input) => {
  return decode(input) as Dictionary;
};
