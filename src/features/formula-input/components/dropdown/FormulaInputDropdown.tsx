import ButtonText from "@/components/UI/ButtonText";
import { cn } from "@/utils/tailwind";
import { memo } from "react";

type Props = {
  outsideRef: (element: HTMLElement | null) => void;
  onSelect: (reference: string) => void;
};

const FormulaInputDropdown = ({ outsideRef, onSelect }: Props) => {
  return (
    <div
      ref={outsideRef}
      className={cn(
        "absolute bottom-full left-1/2 -translate-x-1/2 z-[100]",
        "p-1 w-full",
        "bg-body",
        "rounded-[8px] shadow-sm",
        "border-[#f5f9ef] border",
        "mx-auto font-[500] text-[16px]",
        "hover:border-[#f5f9ef] hover:shadow-md",
        "duration-500",
        "flex flex-col gap-1",
        "items-stretch",
      )}
    >
      {["{phrase}", "{lang}"].map((option) => (
        <ButtonText
          className="w-full"
          key={option}
          onClick={() => onSelect(option)}
        >
          <span>{option}</span>
        </ButtonText>
      ))}
    </div>
  );
};

export default memo(FormulaInputDropdown);
