import { ComponentProps, memo, useCallback, useState } from "react";

import { stringToChunks } from "@/features/formula-input/utils/string-to-chunk";
import { chunksToString } from "@/features/formula-input/utils/chunk-to-string";
import type { Chunk } from "@/features/formula-input/types";

import FormulaInputRaw from "@/features/formula-input/components/FormulaInputRaw";

type Props = Omit<
  ComponentProps<typeof FormulaInputRaw>,
  "value" | "onChange"
> & {
  value: string;
  onChange: (value: string) => void;
};

function FormulaInputComponent({
  value,
  onChange,
  references,
  autoFocus = false,
}: Props) {
  const [chunks, setChunks] = useState<Chunk[]>(() =>
    stringToChunks(typeof value === "string" ? value : ""),
  );

  const handleChunksChange = useCallback((next: Chunk[]) => {
    setChunks(next);
    onChange(chunksToString(next));
  }, []);

  return (
    <FormulaInputRaw
      value={chunks}
      onChange={handleChunksChange}
      references={references}
      autoFocus={autoFocus}
    />
  );
}

export const FormulaInput = memo(FormulaInputComponent);
