import { assert, is } from "superstruct";
import { chunk } from "@std/collections/mod.ts";
import { enums, string } from "superstruct";
import { exporters } from "~/exporters/mod.ts";
import { getHashedEntries } from "~/expr/getHashedEntries.ts";
import { getPrefixEntries } from "~/expr/getPrefixEntries.ts";
import { getSuffixEntries } from "~/expr/getSuffixEntries.ts";
import { importers } from "~/impoters/mod.ts";
import { minus } from "~/expr/minus.ts";
import { plus } from "~/expr/plus.ts";
import { sort } from "~/expr/sort.ts";
import { uniq } from "~/expr/uniq.ts";
import * as flags from "@std/flags/mod.ts";
import * as path from "@std/path/mod.ts";
import * as streams from "@std/streams/mod.ts";
import type { Dictionary } from "~/type.ts";

import {
  ConvertArgs,
  ExprArgs,
  IsolateArgs,
  SortArgs,
  UniqArgs,
} from "~/structs.ts";

const args = flags.parse(Deno.args);

const stdin = async () => {
  return await streams.readAll(Deno.stdin);
};

const echo = (input: Uint8Array): void => {
  Deno.writeSync(Deno.stdout.rid, input);
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
        importer(Deno.readFileSync(path)),
      ] as const;
    })
    .reduce<Dictionary>((acc, [operation, dict]) => {
      if (operation === "+") {
        return plus(acc, dict);
      } else {
        return minus(acc, dict);
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
  Deno.writeFileSync(
    path.format({
      ...filename,
      ext: ".hashed" + filename.ext,
    }),
    exporter(hashedEntries),
  );

  const prefixEntries = getPrefixEntries(dict);
  Deno.writeFileSync(
    path.format({
      ...filename,
      ext: ".prefix" + filename.ext,
    }),
    exporter(prefixEntries),
  );

  const suffixEntries = getSuffixEntries(dict);
  Deno.writeFileSync(
    path.format({
      ...filename,
      ext: ".suffix" + filename.ext,
    }),
    exporter(suffixEntries),
  );

  Deno.writeFileSync(
    path.format(filename),
    exporter(minus(dict, hashedEntries, prefixEntries, suffixEntries)),
  );
} else {
  Deno.exit(1);
}
