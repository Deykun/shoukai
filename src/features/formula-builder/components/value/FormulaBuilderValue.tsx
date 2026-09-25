import { cn } from "@/utils/tailwind";
import { memo, useMemo } from "react";
import { getChunksFromValue } from "../../utils/chunks";

type Props = {
  className?: string;
  value: string;
};

export const FormulaBuilderValue = memo(({ className = "", value }: Props) => {
  const chunks = useMemo(() => {
    return getChunksFromValue(value);
  }, [value]);

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
            <span className={cn("box-decoration-clone rounded-[4px]")}>
              <span className="bg-[#e8f9d0] text-primary-contrast">
                {chunk.reference}
              </span>
            </span>
          );
        }

        return null;
      })}
    </div>
  );
});
