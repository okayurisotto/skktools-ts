import type { Dictionary } from "~/type.ts";
import * as flags from "@std/flags/mod.ts";
import { assert, is } from "superstruct";
import * as streams from "@std/streams/mod.ts";
import * as path from "@std/path/mod.ts";
import { chunk } from "@std/collections/mod.ts";
import { enums, string } from "superstruct";
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
import {
  ConvertArgs,
  ExprArgs,
  IsolateArgs,
  SortArgs,
  UniqArgs,
} from "~/structs.ts";

const args = flags.parse(Deno.args);

const stdin = async () => {
  return new TextDecoder().decode(await streams.readAll(Deno.stdin));
};

const echo = (input: string): void => {
  Deno.writeSync(Deno.stdout.rid, new TextEncoder().encode(input));
};

if (is(args, ConvertArgs)) {
  const importer = importers[args.from];
  const exporter = exporters[args.to];

  echo(exporter(importer(await stdin())));
} else if (is(args, ExprArgs)) {
  const importer = importers[args.from];
  const exporter = exporters[args.to];

  const dict = chunk(["+", ...args._], 2)
    .map(([operation, path]) => {
      assert(operation, enums(["+", "-"]));
      assert(path, string());

      return [
        operation,
        importer(Deno.readTextFileSync(path)),
      ] as const;
    })
    .reduce<Dictionary>((acc, [operation, dict]) => {
      if (operation === "+") {
        return expr.plus(acc, dict);
      } else {
        return expr.minus(acc, dict);
      }
    }, []);

  echo(exporter(dict));
} else if (is(args, SortArgs)) {
  const importer = importers[args.from];
  const exporter = exporters[args.to];

  echo(exporter(sort(importer(await stdin()))));
} else if (is(args, UniqArgs)) {
  const importer = importers[args.from];
  const exporter = exporters[args.to];

  echo(exporter(uniq(importer(await stdin()))));
} else if (is(args, IsolateArgs)) {
  const importer = importers[args.from];
  const exporter = exporters[args.to];

  const dict = importer(await stdin());

  const filename = path.parse(args["filename"]);

  const hashedEntries = getHashedEntries(dict);
  Deno.writeTextFileSync(
    path.format({
      ...filename,
      ext: ".hashed" + filename.ext,
    }),
    exporter(hashedEntries),
  );

  const prefixEntries = getPrefixEntries(dict);
  Deno.writeTextFileSync(
    path.format({
      ...filename,
      ext: ".prefix" + filename.ext,
    }),
    exporter(prefixEntries),
  );

  const suffixEntries = getSuffixEntries(dict);
  Deno.writeTextFileSync(
    path.format({
      ...filename,
      ext: ".suffix" + filename.ext,
    }),
    exporter(suffixEntries),
  );

  Deno.writeTextFileSync(
    path.format(filename),
    exporter(expr.minus(dict, hashedEntries, prefixEntries, suffixEntries)),
  );
} else {
  Deno.exit(1);
}
