export type Reference = `{{${string}}}`;

export type MaybeReference = Reference | (string & {}) | undefined;

export type ReferenceConfig = {
  value: Reference;
  label: string;
  type: "string" | "number";
};

export const VARIABLE_REFERENCES: Record<
  "EMPTY" | "DEFAULT",
  ReferenceConfig[]
> = {
  EMPTY: [],
  DEFAULT: [{ value: "{{phrase}}", label: "Phrase", type: "string" }],
};
