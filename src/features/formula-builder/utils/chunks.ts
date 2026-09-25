import { REFERENCE_START, REFERENCE_END } from "../constants";

export type Chunk =
  | {
      type: "text";
      value: string;
    }
  | {
      type: "reference";
      reference: string;
    };

const hasWhitespace = (text: string) => /\s/.test(text);

// Text is kept verbatim (no trimming); only empty text is skipped.
const pushText = (chunks: Chunk[], value: string) => {
  if (value) {
    chunks.push({ type: "text", value });
  }
};

export const getChunksFromValue = (value: string): Chunk[] => {
  if (!value) {
    return [{ type: "text", value: "" }];
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
    pushText(chunks, value.slice(textStart, start));
    chunks.push({ type: "reference", reference: value.slice(start, next) });
    textStart = next;
    cursor = next;
  }

  pushText(chunks, value.slice(textStart));

  return chunks;
};
