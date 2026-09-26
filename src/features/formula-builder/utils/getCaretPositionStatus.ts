import { REFERENCE_START, REFERENCE_END } from "../constants";

export type CaretPositionStatus =
  | {
      type: "text";
      startingPosition: number;
    }
  | {
      type: "reference";
      startingPosition: number;
      text: string;
      status: "valid" | "draft";
    };

type Params = {
  value: string;
  caretPosition: number;
};

const isWhitespace = (char: string) => /\s/.test(char);

// Index where the continuous run after `{{` stops: first whitespace, `}}` or end of value.
const findRunEnd = (value: string, from: number) => {
  let index = from;
  while (
    index < value.length &&
    !isWhitespace(value[index]) &&
    !value.startsWith(REFERENCE_END, index)
  ) {
    index += 1;
  }
  return index;
};

// Caret must sit within a continuous (no whitespace) run, from `{{` inclusive
// up to and including the position right after `}}` (or the whitespace / end for a draft).
// Run closed by `}}` -> "valid", run cut by whitespace / end of value -> "draft".
// `startingPosition` is the index of `{{`, `text` spans the whole run
// (draft: up to the whitespace / end, not only up to the caret).
export const getCaretPositionStatus = ({
  value,
  caretPosition: caret,
}: Params): CaretPositionStatus => {
  let cursor = 0;

  while (cursor < value.length) {
    const start = value.indexOf(REFERENCE_START, cursor);
    // No opener left, or caret sits before `{{`
    if (start === -1 || start > caret) {
      break;
    }

    const refStart = start + REFERENCE_START.length;
    const runEnd = findRunEnd(value, refStart);
    const isClosed = value.startsWith(REFERENCE_END, runEnd);
    const end = isClosed ? runEnd + REFERENCE_END.length : runEnd;

    if (caret <= end) {
      return {
        type: "reference",
        startingPosition: start,
        text: value.slice(start, end),
        status: isClosed ? "valid" : "draft",
      };
    }

    // Caret past this run: skip closed ref whole, else retry right after `{{`
    cursor = isClosed ? end : refStart;
  }

  return {
    type: "text",
    startingPosition: caret,
  };
};
