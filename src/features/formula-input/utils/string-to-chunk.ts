import { REFERENCE_END, REFERENCE_START } from "../constants";
import type { Chunk } from "../types";

// Spaces divide plain text into separate input chunks; runs of spaces and
// leading/trailing ones produce no empty chunks.
const pushInputs = (chunks: Chunk[], text: string) => {
  text
    .split(" ")
    .filter(Boolean)
    .forEach((value) => chunks.push({ type: "input", value }));
};

export const stringToChunks = (value: string): Chunk[] => {
  const chunks: Chunk[] = [];
  let cursor = 0;

  while (cursor < value.length) {
    const start = value.indexOf(REFERENCE_START, cursor);
    if (start === -1) {
      pushInputs(chunks, value.slice(cursor));
      break;
    }

    const refStart = start + REFERENCE_START.length;
    const end = value.indexOf(REFERENCE_END, refStart);
    if (end === -1) {
      // unterminated ref - treat rest as plain input
      pushInputs(chunks, value.slice(cursor));
      break;
    }

    pushInputs(chunks, value.slice(cursor, start));
    chunks.push({ type: "variable", reference: value.slice(refStart, end) });
    cursor = end + REFERENCE_END.length;
  }

  return chunks;
};
