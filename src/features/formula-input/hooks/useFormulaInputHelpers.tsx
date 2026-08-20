import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react";

import { Chunk } from "@/features/formula-input/types";

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

const useFormulaInputHelpers = () => {
  const [chunks, setChunks] = useState<Chunk[]>([{ type: "input", value: "" }]);

  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const caretRef = useRef<{ index: number; offset: number } | null>(null);

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
  });

  const handleInputUpdate = useCallback(
    (index: number, value: string, caretPosition: number) => {
      const values = value.split(" ");

      // Emptied out: drop the chunk and slide into the next input. The last
      // chunk standing stays, otherwise there would be nothing to type into.
      if (value === "" && chunks.length > 1) {
        const remaining = [
          ...chunks.slice(0, index),
          ...chunks.slice(index + 1),
        ];

        const next = findInputIndex(remaining, index, 1);
        const target =
          next === -1 ? findInputIndex(remaining, index - 1, -1) : next;
        const targetChunk = target === -1 ? undefined : remaining[target];

        caretRef.current =
          targetChunk?.type === "input"
            ? {
                index: target,
                // No next input to enter, so land at the end of the one before.
                offset: next === -1 ? targetChunk.value.length : 0,
              }
            : null;

        setChunks(remaining);

        return;
      }

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

        caretRef.current = {
          index: index + target,
          offset: caretPosition - start,
        };
      }

      const newChunks: Chunk[] = values.map((chunkValue) => ({
        type: "input",
        value: chunkValue,
      }));

      setChunks([
        ...chunks.slice(0, index),
        ...newChunks,
        ...chunks.slice(index + 1),
      ]);
    },
    [chunks],
  );

  // Backspace at the start of an input glues it onto the one before it, caret
  // sitting on the seam. A variable in between blocks the merge.
  const handleMergePrevious = useCallback(
    (index: number) => {
      const previous = chunks[index - 1];
      const current = chunks[index];

      if (previous?.type !== "input" || current?.type !== "input") {
        return;
      }

      caretRef.current = { index: index - 1, offset: previous.value.length };

      setChunks([
        ...chunks.slice(0, index - 1),
        { type: "input", value: previous.value + current.value },
        ...chunks.slice(index + 1),
      ]);
    },
    [chunks],
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
    handleInputUpdate,
    handleMergePrevious,
    handleCaretExit,
    handleContainerClick,
  };
};

export default useFormulaInputHelpers;
