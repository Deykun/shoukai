import { cn } from "@/utils/tailwind";
import { memo } from "react";

type Props = {
  reference: string;
};

const FormulaReference = ({ reference }: Props) => {
  return (
    <span
      className={cn(
        "texts-[#075525] text-[80%] p-1 rounded-md",
        "rounded-md",
        "bg-primary-contrast text-primary",
      )}
    >
      {reference}
    </span>
  );
};

export default memo(FormulaReference);
