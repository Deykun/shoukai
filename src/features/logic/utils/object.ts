// { a: { b: V } } from "a.b"
export type ObjectFromPath<P extends string, V> =
  P extends `${infer Key}.${infer Rest}`
    ? { [K in Key]: ObjectFromPath<Rest, V> }
    : { [K in P]: V };

export const getObjectFromPath = <P extends string, V>(
  path: P,
  value: V,
): ObjectFromPath<P, V> =>
  path
    .split(".")
    .reduceRight<unknown>(
      (nested, key) => ({ [key]: nested }),
      value,
    ) as ObjectFromPath<P, V>;

const getIsPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

// arrays are leaves, replaced not merged
export const getDeepMerged = <T>(target: T, source: unknown): T => {
  if (!getIsPlainObject(target) || !getIsPlainObject(source)) {
    return source === undefined ? target : (source as T);
  }

  return Object.entries(source).reduce<Record<string, unknown>>(
    (merged, [key, value]) => ({
      ...merged,
      [key]: getDeepMerged(merged[key], value),
    }),
    { ...target },
  ) as T;
};
