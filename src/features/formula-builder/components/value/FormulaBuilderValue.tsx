import { cn } from "@/utils/tailwind";
import { memo } from "react";
import { Chunk } from "../../utils/chunks";

type Props = {
  className?: string;
  chunks: Chunk[];
};

export const FormulaBuilderValue = memo(({ className = "", chunks }: Props) => {
  return (
    <div className={cn("pointer-events-none", className)}>
      {chunks.map((chunk) => {
        if (chunk.type === "text") {
          return chunk.value;
        }

        if (chunk.type === "reference") {
          return (
            <span
              className={cn(
                "box-decoration-clone rounded-[4px]",
                {
                  "bg-[#e8f9d0] text-primary-contrast": chunk.state === "valid",
                  "bg-[#f6f0d2] text-[#c9602d]": chunk.state === "invalid",
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
});
