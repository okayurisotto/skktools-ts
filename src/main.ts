import { assert, is } from "superstruct";
import { chunk } from "@std/collections/chunk.ts";
import { ConvertArgs, ExprArgs, SortArgs, UniqArgs } from "~/structs.ts";
import { echo, stdin } from "~/io.ts";
import { enums, string } from "superstruct";
import { exporters } from "~/exporters/mod.ts";
import { importers } from "~/impoters/mod.ts";
import { minus } from "~/expr/minus.ts";
import { plus } from "~/expr/plus.ts";
import { sort } from "~/expr/sort.ts";
import { uniq } from "~/expr/uniq.ts";
import * as flags from "@std/flags/mod.ts";
import type { Dictionary } from "~/type.ts";

const args = flags.parse(Deno.args);

const modes = ["convert", "expr", "sort", "uniq"] as const;

const mains: Map<
  (typeof modes)[number],
  <T extends ReturnType<typeof flags.parse>>(args: T) => void | Promise<void>
> = new Map([
  ["convert", async (args) => {
    if (!is(args, ConvertArgs)) return;

    const importer = importers[args.from];
    const exporter = exporters[args.to];

    await stdin()
      .then(importer)
      .then(exporter)
      .then(echo);
  }],
  ["expr", (args) => {
    if (!is(args, ExprArgs)) return;

    const importer = importers[args.from];
    const exporter = exporters[args.to];

    const dict = (() => {
      try {
        return chunk(["+", ...args._], 2)
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
            } else if (operation === "-") {
              return minus(acc, dict);
            }

            return acc;
          }, []);
      } catch {
        console.error(
          "引数異常：" +
            "`expr`モードの引数は`<operator filename>+`である必要があります。",
        );
        Deno.exit(1);
      }
    })();

    echo(exporter(dict));
  }],
  ["sort", async (args) => {
    if (!is(args, SortArgs)) return;

    const importer = importers[args.from];
    const exporter = exporters[args.to];

    await stdin()
      .then(importer)
      .then(sort)
      .then(exporter)
      .then(echo);
  }],
  ["uniq", async (args) => {
    if (!is(args, UniqArgs)) return;

    const importer = importers[args.from];
    const exporter = exporters[args.to];

    await stdin()
      .then(importer)
      .then(uniq)
      .then(exporter)
      .then(echo);
  }],
]);

if (!is(args["mode"], enums([...mains.keys()]))) {
  console.error(
    "引数異常：" +
      "`mode`は" +
      modes.map((mode) => "`" + mode + "`").join("または") +
      "である必要があります。",
  );

  Deno.exit(1);
}

for (const main of mains.values()) {
  await main(args);
}
