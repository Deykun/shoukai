import { cn } from "@/utils/tailwind";
import { memo } from "react";

type Props = {
  reference: string;
};

const FormulaReference = ({ reference }: Props) => {
  return (
    <span
      className={cn(
        "p-1 rounded-md",
        "text-[80%] tracking-widest",
        "bg-primary-contrast text-primary",
      )}
    >
      {reference}
    </span>
  );
};

export default memo(FormulaReference);
