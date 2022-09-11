import { argv, echo, fs, stdin } from "zx";
import {
  exporters,
  expr,
  getHashedEntries,
  getPrefixEntries,
  getSuffixEntries,
  importers,
  sort,
  uniq,
} from "./modules";
import { minus } from "./modules/expr";
import type { Dictionary } from "./type";

const mode = argv["mode"];

(async () => {
  const from = argv["from"];
  const importer = importers.get(from);
  if (importer === undefined) throw Error();

  const to = argv["to"];
  const exporter = exporters.get(to);
  if (exporter === undefined) throw Error();

  if (mode === "convert") {
    echo(exporter(importer(await stdin())));
  }

  if (mode === "expr") {
    echo(exporter(
      argv._
        .reduce<{
          operation?: null | "+" | "-";
          path?: string;
        }[]>((acc, cur, idx) => {
          const prev = acc[acc.length - 1];

          if (idx % 2 === 0) {
            if (prev) {
              prev.path = cur;
            } else {
              acc.push({ operation: null, path: cur });
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
            importer(fs.readFileSync(path, { encoding: "utf-8" })),
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
    const filename = argv["filename"];
    if (filename === undefined) throw Error();

    const hashedEntries = getHashedEntries(dict);
    fs.writeFileSync(filename + ".hashed", exporter(hashedEntries));

    const prefixEntries = getPrefixEntries(dict);
    fs.writeFileSync(filename + ".prefix", exporter(prefixEntries));

    const suffixEntries = getSuffixEntries(dict);
    fs.writeFileSync(filename + ".suffix", exporter(suffixEntries));

    fs.writeFileSync(
      filename,
      exporter(minus(dict, hashedEntries, prefixEntries, suffixEntries)),
    );
  }
})();
