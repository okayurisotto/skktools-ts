import type { Exporter, Filetype } from "~/type.ts";
import { toJson } from "./toJson.ts";
import { toMsgpack } from "./toMsgpack.ts";
import { toText } from "./toText.ts";
import { toYaml } from "./toYaml.ts";

export const exporters: Record<Filetype, Exporter> = {
  json: toJson,
  msgpack: toMsgpack,
  text: toText,
  yaml: toYaml,
};
