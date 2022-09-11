(async () => {
  const { argv, path } = await import("zx");
  const esbuild = require("esbuild");

  /** @type {esbuild.BuildOptions} */
  const buildOptions = {
    bundle: true,
    minify: true,
    platform: "node",
  };

  if (argv["mode"] === "build") {
    for (const file of argv._) {
      esbuild.buildSync({
        ...buildOptions,
        entryPoints: [path.resolve(__dirname, file)],
        outfile: path.format({
          dir: path.resolve(__dirname, "dist"),
          name: path.parse(file).name,
          ext: ".js",
        }),
      });
    }
  }
})();
