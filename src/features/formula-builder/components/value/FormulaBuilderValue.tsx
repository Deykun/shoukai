import { cn } from "@/utils/tailwind";
import { memo, useMemo } from "react";
import { Chunk, getChunksFromValue } from "../../utils/chunks";

type Props = {
  className?: string;
  value: string;
  references: string[] | undefined;
};

export const FormulaBuilderValue = memo(
  ({ className = "", value, references }: Props) => {
    const chunks: Chunk[] = useMemo(() => {
      return getChunksFromValue(value, references);
    }, [references, value]);

    console.log(chunks);

    return (
      <div className={cn("pointer-events-none", className)}>
        {chunks.map((chunk) => {
          console.log(chunk);
          if (chunk.type === "text") {
            return chunk.value;
          }

          if (chunk.type === "reference") {
            return (
              <span
                className={cn(
                  "box-decoration-clone rounded-[4px]",
                  {
                    "bg-[#e8f9d0] text-primary-contrast":
                      chunk.state === "valid",
                    "bg-[#f9dcd0]": chunk.state === "invalid",
                  },
                  "starting:bg-transparent duration-500",
                )}
              >
                {chunk.reference}
              </span>
            );
          }

          return null;
        })}
      </div>
    );
  },
);
