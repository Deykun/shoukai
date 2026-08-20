import ButtonText from "@/components/UI/ButtonText";
import { cn } from "@/utils/tailwind";

type Props = {
  outsideRef: (element: HTMLElement | null) => void;
  options: string[];
  value: unknown;
  onSelect: (option: string) => void;
};

export const FlowSelectOptions = ({
  outsideRef,
  options,
  value,
  onSelect,
}: Props) => {
  return (
    <div
      ref={outsideRef}
      className={cn(
        "absolute top-full left-1/2 -translate-x-1/2 z-[100]",
        "p-1",
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
      {options.map((option) => (
        <ButtonText
          className="w-full"
          key={option}
          size="small"
          isActive={option === value}
          onClick={() => onSelect(option)}
        >
          <span>{option}</span>
        </ButtonText>
      ))}
    </div>
  );
};
