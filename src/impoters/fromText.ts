import type { Importer } from "~/type.ts";
import { OKURI_ARI_KEYWORD, OKURI_NASI_KEYWORD } from "~/constants.ts";

enum OkuriState {
  ari,
  nasi,
}

export const fromText: Importer = (input) => {
  const lines = new TextDecoder().decode(input).split("\n");
  const entries = [];
  let okuriState: OkuriState | null = null;

  for (const line of lines) {
    if (line === OKURI_ARI_KEYWORD) {
      okuriState = OkuriState.ari;
      continue;
    }

    if (line === OKURI_NASI_KEYWORD) {
      okuriState = OkuriState.nasi;
      continue;
    }

    if (
      line.trim() === "" ||
      line.startsWith(";") ||
      okuriState === null
    ) {
      continue;
    }

    const [, left, right] = line.match(/^(\S+?) \/(.+?)\/$/) ?? [];
    if (left === undefined) throw new Error(`left:\t${line}`);
    if (right === undefined) throw new Error(`right:\t${line}`);

    const [, source, okuri] = (() => {
      if (okuriState === OkuriState.ari) {
        return left.match(/^(\S+?)([a-z])$/) ?? [];
      } else {
        return [, left, null];
      }
    })();
    if (source === undefined) throw new Error(`source:\t${line}`);
    if (okuri === undefined) throw new Error(`okuri:\t${line}`);

    const candidates = [];
    for (const candidate of right.split("/")) {
      const [text, ...annotations] = candidate.split(";");
      if (text === undefined) throw new Error(`text:\t${line}`);
      candidates.push({ text, annotations });
    }

    entries.push({ source, okuri, candidates });
  }

  return entries;
};
