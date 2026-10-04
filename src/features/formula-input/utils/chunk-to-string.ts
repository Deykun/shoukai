import { REFERENCE_END, REFERENCE_START } from "../constants";
import type { Chunk } from "../types";

export const chunkToString = (chunk: Chunk): string =>
  chunk.type === "input"
    ? chunk.value
    : `${REFERENCE_START}${chunk.reference}${REFERENCE_END}`;

// Chunks are space-separated; empty inputs (padding around variables) are
// skipped so they never leave stray spaces behind.
export const chunksToString = (chunks: Chunk[]): string =>
  chunks
    .filter((chunk) => chunk.type !== "input" || chunk.value !== "")
    .map(chunkToString)
    .join(" ");

export const stringWithoutReferences = (value: string): string =>
  value.replaceAll(REFERENCE_START, "").replaceAll(REFERENCE_END, "");
