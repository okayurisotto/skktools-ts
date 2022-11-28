import { chunk } from "@std/collections/chunk.ts";
import { Command, EnumType } from "cliffy/mod.ts";
import { echo, stdin } from "~/io.ts";
import { exporters } from "~/exporters/mod.ts";
import { filetypes } from "~/constants.ts";
import { importers } from "~/impoters/mod.ts";
import { minus } from "~/expr/minus.ts";
import { plus } from "~/expr/plus.ts";
import { sort } from "~/expr/sort.ts";
import { uniq } from "~/expr/uniq.ts";
import type { Dictionary } from "~/type.ts";

const filetype = new EnumType(filetypes);

await new Command()
  .type("filetype", filetype)
  .globalOption(
    "--from <from-filetype:filetype>",
    "input dictionary file type.",
    { required: true },
  )
  .globalOption(
    "--to <to-filetype:filetype>",
    "output dictionary file type.",
    { required: true },
  )
  // convert ---------------------------------------------------
  .command("convert", "convert dictionary.")
  .action(async ({ from, to }) => {
    const importer = importers[from];
    const exporter = exporters[to];

    await stdin()
      .then(importer)
      .then(exporter)
      .then(echo);
  })
  // expr ------------------------------------------------------
  .command("expr", "merge multiple dictionaries.")
  .arguments("<args...:string>")
  .action(({ from, to }, ...args) => {
    const importer = importers[from];
    const exporter = exporters[to];

    const dict = (() => {
      try {
        return chunk(["+", ...args], 2)
          .map(([operation, path]) => {
            if (typeof operation !== "string") throw new Error();
            if (["+", "-"].includes(operation)) throw new Error();
            if (typeof path !== "string") throw new Error();

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
        throw new Error("something went wrong.");
      }
    })();

    echo(exporter(dict));
  })
  // sort ------------------------------------------------------
  .command("sort", "sort dictionary entries.")
  .action(async ({ from, to }) => {
    const importer = importers[from];
    const exporter = exporters[to];

    await stdin()
      .then(importer)
      .then(sort)
      .then(exporter)
      .then(echo);
  })
  // uniq ------------------------------------------------------
  .command("uniq", "make dictionary entries unique.")
  .action(async ({ from, to }) => {
    const importer = importers[from];
    const exporter = exporters[to];

    await stdin()
      .then(importer)
      .then(uniq)
      .then(exporter)
      .then(echo);
  })
  .parse(Deno.args);
