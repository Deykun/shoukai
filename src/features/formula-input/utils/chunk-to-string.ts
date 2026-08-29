import { REFERENCE_END, REFERENCE_START } from "../constants";
import type { Chunk } from "../types";

export const chunkToString = (chunk: Chunk): string =>
  chunk.type === "input"
    ? chunk.value
    : `${REFERENCE_START}${chunk.reference}${REFERENCE_END}`;

export const chunksToString = (chunks: Chunk[]): string =>
  chunks.map(chunkToString).join("");
