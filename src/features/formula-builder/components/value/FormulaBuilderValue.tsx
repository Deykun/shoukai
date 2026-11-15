import { cn } from "@/utils/tailwind";
import { memo, useMemo } from "react";
import { getChunksFromValue } from "../../utils/chunks";
import { FormulaBuilderValueReference } from "./core/FormulaBuilderValueReference";
import { ReferenceConfig } from "@/features/logic/constants";

type Props = {
  className?: string;
  value: string;
  references: ReferenceConfig[];
};

export const FormulaBuilderValue = memo(
  ({ className = "", value, references }: Props) => {
    const chunks = useMemo(() => {
      return getChunksFromValue(value, references);
    }, [references, value]);

    return (
      <div className={cn("pointer-events-none", className)}>
        {chunks.map((chunk) => {
          if (chunk.type === "text") {
            return chunk.value;
          }

          if (chunk.type === "reference") {
            return (
              <FormulaBuilderValueReference
                reference={chunk.reference}
                state={chunk.state}
              />
            );
          }

          return null;
        })}
      </div>
    );
  },
);
