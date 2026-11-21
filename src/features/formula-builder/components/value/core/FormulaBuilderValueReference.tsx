import { cn } from "@/utils/tailwind";
import { memo } from "react";
import type { Chunk } from "../../../utils/chunks";
import { getReferenceWithoutBrackets } from "@/features/formula-builder/utils/references/getReferenceWithoutBrackets";
import {
  REFERENCE_END,
  REFERENCE_START,
} from "@/features/formula-builder/constants";

type Props = Pick<Extract<Chunk, { type: "reference" }>, "reference" | "state">;

export const FormulaBuilderValueReference = memo(
  ({ reference, state }: Props) => {
    const referenceWithoutBrackets = getReferenceWithoutBrackets(reference);
    const [variablePath, ...modifiers] = referenceWithoutBrackets.split("|");

    return (
      <span
        className={cn(
          "box-decoration-clone rounded-[4px]",
          {
            "bg-[#e8f9d0] text-primary-contrast": state === "valid",
            "bg-[#f6f0d2] text-[#c9602d]": state === "invalid",
          },
          "starting:bg-transparent duration-500",
        )}
      >
        {REFERENCE_START}
        {variablePath.split(".").map((part, index, parts) => {
          const isFirst = index === 0;
          const isLast = index === parts.length - 1;

          return (
            <>
              <span
                key={index}
                className={cn({
                  "opacity-75": isFirst,
                  "opacity-30 saturate-50": !isFirst && !isLast,
                })}
              >
                {part}
                {!isLast && "."}
              </span>
            </>
          );
        })}
        {modifiers.map((modifier, index) => (
          <span key={index}>
            <span
              className={cn({
                "text-primary-contrast": state === "valid",
              })}
            >
              {"|"}
            </span>
            <span className={cn("opacity-50")}>{modifier}</span>
          </span>
        ))}
        {REFERENCE_END}
      </span>
    );
  },
);
