import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react";

import { Chunk } from "@/features/formula-input/types";

type CaretPosition = { index: number; offset: number };

const findInputIndex = (chunks: Chunk[], from: number, direction: -1 | 1) => {
  for (
    let index = from;
    index >= 0 && index < chunks.length;
    index += direction
  ) {
    if (chunks[index].type === "input") {
      return index;
    }
  }

  return -1;
};

// Invariant: an input opens the list, closes it, and sits between any two
// variables — so there is always somewhere to type around each reference.
// `indexMap` tells where each original chunk ended up after the padding.
const normalizeChunks = (chunks: Chunk[]) => {
  const result: Chunk[] = [];
  const indexMap: number[] = [];

  chunks.forEach((chunk) => {
    if (
      chunk.type === "variable" &&
      result[result.length - 1]?.type !== "input"
    ) {
      result.push({ type: "input", value: "" });
    }

    indexMap.push(result.length);
    result.push(chunk);
  });

  if (result[result.length - 1]?.type !== "input") {
    result.push({ type: "input", value: "" });
  }

  return { chunks: result, indexMap };
};

// An input with no input neighbour holds the invariant together — dropping it
// would leave two variables (or an edge) touching.
const isInputRequired = (chunks: Chunk[], index: number) =>
  chunks[index - 1]?.type !== "input" && chunks[index + 1]?.type !== "input";

const useFormulaInputHelpers = () => {
  const [chunks, setChunks] = useState<Chunk[]>([
    { type: "input", value: "look" },
    { type: "variable", reference: "{phrase}" },
    { type: "input", value: "site:filmweb.pl" },
  ]);

  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const caretRef = useRef<CaretPosition | null>(null);

  // Where the caret last sat: which input chunk and the offset inside it.
  const [lastCaret, setLastCaret] = useState<CaretPosition | null>(null);

  const handleCaretChange = useCallback((index: number, offset: number) => {
    setLastCaret({ index, offset });
  }, []);

  // Place the caret once the chunk it belongs to exists in the DOM — splits,
  // removals and cross-input edits all land it in a different input.
  useEffect(() => {
    const caret = caretRef.current;

    if (!caret) {
      return;
    }

    caretRef.current = null;

    const input = inputsRef.current[caret.index];

    input?.focus();
    input?.setSelectionRange(caret.offset, caret.offset);
    setLastCaret(caret);
  });

  // Every chunk change goes through here so the invariant is enforced and the
  // requested caret survives any padding inserted in front of it.
  const commitChunks = useCallback(
    (next: Chunk[], caret: CaretPosition | null) => {
      const normalized = normalizeChunks(next);

      caretRef.current = caret && {
        ...caret,
        index: normalized.indexMap[caret.index] ?? caret.index,
      };

      setChunks(normalized.chunks);
    },
    [],
  );

  const handleInputUpdate = useCallback(
    (index: number, value: string, caretPosition: number) => {
      const values = value.split(" ");

      // Emptied out: drop the chunk and slide into the next input. Required
      // inputs stay put (empty) so the invariant holds.
      if (value === "" && !isInputRequired(chunks, index)) {
        const remaining = [
          ...chunks.slice(0, index),
          ...chunks.slice(index + 1),
        ];

        const next = findInputIndex(remaining, index, 1);
        const target =
          next === -1 ? findInputIndex(remaining, index - 1, -1) : next;
        const targetChunk = target === -1 ? undefined : remaining[target];

        commitChunks(
          remaining,
          targetChunk?.type === "input"
            ? {
                index: target,
                // No next input to enter, so land at the end of the one before.
                offset: next === -1 ? targetChunk.value.length : 0,
              }
            : null,
        );

        return;
      }

      let caret: CaretPosition | null = null;

      if (values.length > 1) {
        // Which of the new chunks the caret ended up in, and where inside it.
        let start = 0;
        let target = values.length - 1;

        for (let i = 0; i < values.length; i += 1) {
          if (caretPosition <= start + values[i].length) {
            target = i;
            break;
          }

          start += values[i].length + 1;
        }

        caret = {
          index: index + target,
          offset: caretPosition - start,
        };
      }

      const newChunks: Chunk[] = values.map((chunkValue) => ({
        type: "input",
        value: chunkValue,
      }));

      commitChunks(
        [...chunks.slice(0, index), ...newChunks, ...chunks.slice(index + 1)],
        caret,
      );
    },
    [chunks, commitChunks],
  );

  // Drop a variable where the caret last sat, splitting that input around it.
  // Without a usable caret it goes to the end (normalisation pads an input
  // after it so there is still somewhere to type).
  const handleInsertReference = useCallback(
    (reference: string) => {
      const variable: Chunk = { type: "variable", reference };
      const target = lastCaret ? chunks[lastCaret.index] : undefined;

      if (!lastCaret || target?.type !== "input") {
        commitChunks(
          [...chunks, variable, { type: "input", value: "" }],
          { index: chunks.length + 1, offset: 0 },
        );

        return;
      }

      const { index, offset } = lastCaret;

      commitChunks(
        [
          ...chunks.slice(0, index),
          { type: "input", value: target.value.slice(0, offset) },
          variable,
          { type: "input", value: target.value.slice(offset) },
          ...chunks.slice(index + 1),
        ],
        { index: index + 2, offset: 0 },
      );
    },
    [chunks, lastCaret, commitChunks],
  );

  // Backspace at the start of an input glues it onto the one before it, caret
  // sitting on the seam. A variable before it is deleted instead, like a
  // character would be — the caret stays where it is.
  const handleMergePrevious = useCallback(
    (index: number) => {
      const previous = chunks[index - 1];
      const current = chunks[index];

      if (current?.type !== "input") {
        return;
      }

      if (previous?.type === "variable") {
        commitChunks(
          [...chunks.slice(0, index - 1), ...chunks.slice(index)],
          { index: index - 1, offset: 0 },
        );

        return;
      }

      if (previous?.type !== "input") {
        return;
      }

      commitChunks(
        [
          ...chunks.slice(0, index - 1),
          { type: "input", value: previous.value + current.value },
          ...chunks.slice(index + 1),
        ],
        { index: index - 1, offset: previous.value.length },
      );
    },
    [chunks, commitChunks],
  );

  // Hop to the closest input on either side, entering it from the edge the
  // caret came out of. No-op when there is none.
  const handleCaretExit = useCallback(
    (index: number, direction: -1 | 1) => {
      for (
        let next = index + direction;
        next >= 0 && next < chunks.length;
        next += direction
      ) {
        const input = inputsRef.current[next];

        if (input) {
          const offset = direction === -1 ? input.value.length : 0;

          input.focus();
          input.setSelectionRange(offset, offset);

          return;
        }
      }
    },
    [chunks.length],
  );

  // Clicking the padding/gaps around the chunks behaves like clicking the end
  // of the formula.
  const handleContainerClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (event.target !== event.currentTarget) {
        return;
      }

      for (let index = chunks.length - 1; index >= 0; index -= 1) {
        const input = inputsRef.current[index];

        if (input) {
          input.focus();
          input.setSelectionRange(input.value.length, input.value.length);

          return;
        }
      }
    },
    [chunks.length],
  );

  return {
    chunks,
    inputsRef,
    lastCaret,
    handleCaretChange,
    handleInputUpdate,
    handleInsertReference,
    handleMergePrevious,
    handleCaretExit,
    handleContainerClick,
  };
};

export default useFormulaInputHelpers;
