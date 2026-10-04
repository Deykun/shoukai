import { cn } from "@/utils/tailwind";
import { memo } from "react";

type Props = {
  reference: string;
  onClick: () => void;
  isActive?: boolean;
};

const FormulaButtonReference = ({
  reference,
  onClick,
  isActive = false,
}: Props) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "p-1 rounded-md",
        "text-[80%] tracking-widest",
        "bg-primary-contrast text-primary",
        "hover:opacity-80 duration-300",
        {
          "bg-black text-primary": isActive,
        },
      )}
    >
      {reference}
    </button>
  );
};

FormulaButtonReference.displayName = "FormulaButtonReference";

export default memo(FormulaButtonReference);
