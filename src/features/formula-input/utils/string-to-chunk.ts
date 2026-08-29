import { REFERENCE_END, REFERENCE_START } from "../constants";
import type { Chunk } from "../types";

export const stringToChunks = (value: string): Chunk[] => {
  const chunks: Chunk[] = [];
  let cursor = 0;

  while (cursor < value.length) {
    const start = value.indexOf(REFERENCE_START, cursor);
    if (start === -1) {
      chunks.push({ type: "input", value: value.slice(cursor) });
      break;
    }

    const refStart = start + REFERENCE_START.length;
    const end = value.indexOf(REFERENCE_END, refStart);
    if (end === -1) {
      // unterminated ref - treat rest as plain input
      chunks.push({ type: "input", value: value.slice(cursor) });
      break;
    }

    if (start > cursor) {
      chunks.push({ type: "input", value: value.slice(cursor, start) });
    }
    chunks.push({ type: "variable", reference: value.slice(refStart, end) });
    cursor = end + REFERENCE_END.length;
  }

  return chunks;
};
