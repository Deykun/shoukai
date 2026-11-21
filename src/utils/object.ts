export const isKeyOf = <T extends object>(
  obj: T,
  key: PropertyKey,
): key is keyof T => key in obj;
