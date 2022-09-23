import type { Dictionary } from "~/type.ts";
import * as flags from "@std/flags/mod.ts";
import { assert } from "superstruct";
import * as streams from "@std/streams/mod.ts";
import {
  exporters,
  expr,
  getHashedEntries,
  getPrefixEntries,
  getSuffixEntries,
  importers,
  sort,
  uniq,
} from "~/modules/index.ts";
import { minus } from "~/modules/expr/index.ts";
import { Args } from "~/structs.ts";

const args = flags.parse(Deno.args);
assert(args, Args);

const stdin = async () => {
  return new TextDecoder().decode(await streams.readAll(Deno.stdin));
};

const echo = (input: string): void => {
  Deno.writeSync(Deno.stdout.rid, new TextEncoder().encode(input));
};

const mode = args["mode"];

(async () => {
  const importer = importers[args.from];
  const exporter = exporters[args.to];

  if (mode === "convert") {
    echo(exporter(importer(await stdin())));
  }

  if (mode === "expr") {
    echo(exporter(
      args._
        .reduce<{
          operation?: null | "+" | "-";
          path?: string;
        }[]>((acc, cur, idx) => {
          const prev = acc[acc.length - 1];

          if (idx % 2 === 0) {
            if (prev) {
              prev.path = cur.toString();
            } else {
              acc.push({
                operation: null,
                path: cur.toString(),
              });
            }
          } else {
            if (cur !== "+" && cur !== "-") throw Error();
            acc.push({ operation: cur });
          }

          return acc;
        }, [])
        .map<[null | "+" | "-", Dictionary]>(({ operation, path }) => {
          if (operation === undefined) throw Error();
          if (path === undefined) throw Error();

          return [
            operation,
            importer(Deno.readTextFileSync(path)),
          ];
        })
        .reduce<Dictionary>((acc, [operation, dict]) => {
          if (operation === null) return dict;
          if (operation === "+") return expr.plus(acc, dict);
          if (operation === "-") return expr.minus(acc, dict);

          return acc;
        }, []),
    ));
  }

  if (mode === "sort") {
    echo(exporter(sort(importer(await stdin()))));
  }

  if (mode === "uniq") {
    echo(exporter(uniq(importer(await stdin()))));
  }

  if (mode === "isolate") {
    const dict = importer(await stdin());

    const filename = args["filename"];
    if (filename === undefined) throw Error();

    const hashedEntries = getHashedEntries(dict);
    Deno.writeTextFileSync(filename + ".hashed", exporter(hashedEntries));

    const prefixEntries = getPrefixEntries(dict);
    Deno.writeTextFileSync(filename + ".prefix", exporter(prefixEntries));

    const suffixEntries = getSuffixEntries(dict);
    Deno.writeTextFileSync(filename + ".suffix", exporter(suffixEntries));

    Deno.writeTextFileSync(
      filename,
      exporter(minus(dict, hashedEntries, prefixEntries, suffixEntries)),
    );
  }
})();
