// arrays are leaves
export type DeepPartial<T> = T extends readonly unknown[]
  ? T
  : T extends object
    ? { [K in keyof T]?: DeepPartial<T[K]> }
    : T;

// "a" | "a.b" — arrays are leaves
export type ObjectPath<T> = T extends readonly unknown[]
  ? never
  : T extends object
    ? {
        [K in keyof T & string]: T[K] extends readonly unknown[]
          ? K
          : T[K] extends object
            ? K | `${K}.${ObjectPath<T[K]>}`
            : K;
      }[keyof T & string]
    : never;

export type ObjectPathValue<
  T,
  P extends string,
> = P extends `${infer Key}.${infer Rest}`
  ? Key extends keyof T
    ? ObjectPathValue<T[Key], Rest>
    : never
  : P extends keyof T
    ? T[P]
    : never;
