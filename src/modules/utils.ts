export const range = function* ({
  start = 0,
  stop = Infinity,
  step = 1,
}): Generator<number> {
  for (let i = start; i < stop; i += step) {
    yield i;
  }
};

export const sortFn = (a: string, b: string): number => {
  if (a > b) return +1;
  if (a < b) return -1;
  return 0;
};
