import type { Exporter } from "~/type.ts";
import { encode } from "@msgpack/msgpack";

export const toMsgpack: Exporter = (dict) => {
  return encode(dict);
};
