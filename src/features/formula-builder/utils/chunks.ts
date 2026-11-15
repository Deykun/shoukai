import { REFERENCE_START, REFERENCE_END } from "../constants";

type ChunkShared = {
  startingPosition: number;
  toPosition: number;
};

export type Chunk =
  | ({
      type: "text";
      value: string;
    } & ChunkShared)
  | ({
      type: "reference";
      reference: string;
      state: "invalid" | "valid";
    } & ChunkShared);

const hasWhitespace = (text: string) => /\s/.test(text);

// Text is kept verbatim (no trimming); only empty text is skipped.
const pushText = (chunks: Chunk[], value: string, startingPosition: number) => {
  if (value) {
    chunks.push({
      type: "text",
      value,
      startingPosition,
      toPosition: startingPosition + value.length,
    });
  }
};

export const getChunksFromValue = (
  value: string,
  references: string[] = [],
): Chunk[] => {
  if (!value) {
    return [{ type: "text", value: "", startingPosition: 0, toPosition: 0 }];
  }

  const chunks: Chunk[] = [];
  let textStart = 0;
  let cursor = 0;

  while (cursor < value.length) {
    const start = value.indexOf(REFERENCE_START, cursor);
    if (start === -1) {
      break;
    }

    const refStart = start + REFERENCE_START.length;
    const end = value.indexOf(REFERENCE_END, refStart);
    if (end === -1) {
      break;
    }

    if (hasWhitespace(value.slice(refStart, end))) {
      // refs cannot contain whitespace - skip this start marker
      cursor = refStart;
      continue;
    }

    const next = end + REFERENCE_END.length;
    const reference = value.slice(start, next);
    pushText(chunks, value.slice(textStart, start), textStart);
    chunks.push({
      type: "reference",
      reference,
      state: references.includes(reference) ? "valid" : "invalid",
      startingPosition: start,
      toPosition: next,
    });
    textStart = next;
    cursor = next;
  }

  pushText(chunks, value.slice(textStart), textStart);

  return chunks;
};
