import * as streams from "@std/streams/mod.ts";

export const stdin = async () => {
  return await streams.readAll(Deno.stdin);
};
export const echo = async (input: Uint8Array): Promise<void> => {
  await Deno.write(Deno.stdout.rid, input);
};
