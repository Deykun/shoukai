export const RUN_TYPE = {
  REAL: "real",
  TEST: "test",
} as const;

export type RunType = (typeof RUN_TYPE)[keyof typeof RUN_TYPE];
