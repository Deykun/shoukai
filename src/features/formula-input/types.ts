export type Chunk =
  | {
      type: "input";
      value: string;
    }
  | {
      type: "variable";
      reference: string;
    };
