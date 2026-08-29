import ButtonText from "@/components/UI/ButtonText";
import { cn } from "@/utils/tailwind";
import { memo } from "react";

type Props = {
  outsideRef: (element: HTMLElement | null) => void;
  onSelect: (reference: string) => void;
  activeReference?: string;
};

const FormulaInputDropdown = ({
  outsideRef,
  onSelect,
  activeReference,
}: Props) => {
  return (
    <div
      ref={outsideRef}
      className={cn(
        "absolute bottom-full left-1/2 -translate-x-1/2 z-[100]",
        "p-1 w-full",
        "py-4 px-6 mb-3",
        "bg-white",
        "rounded-[24px] shadow-md",
        "border-[#f5f9ef] border",
        "mx-auto font-[500] text-[14px]",
        "hover:border-[#f5f9ef] hover:shadow-lg",
        "duration-500",
        "duration-500",
        "flex flex-wrap justify-center gap-1",
        "items-stretch",
      )}
    >
      {["{{phrase}}", "{{lang}}"].map((option) => (
        <ButtonText
          className="w-full"
          key={option}
          onClick={() => onSelect(option)}
          isActive={option === activeReference}
        >
          <span>{option}</span>
        </ButtonText>
      ))}
    </div>
  );
};

export default memo(FormulaInputDropdown);
