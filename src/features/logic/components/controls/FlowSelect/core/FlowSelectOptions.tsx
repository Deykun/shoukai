import ButtonText from "@/components/UI/ButtonText";
import { cn } from "@/utils/tailwind";

type Props = {
  options: string[];
  value: unknown;
  onSelect: (option: string) => void;
};

export const FlowSelectOptions = ({ options, value, onSelect }: Props) => {
  return (
    <div className={cn("duration-500", "flex gap-1", "items-stretch")}>
      {options.map((option) => (
        <ButtonText
          className="w-full"
          key={option}
          isActive={option === value}
          onClick={() => onSelect(option)}
        >
          <span>{option}</span>
        </ButtonText>
      ))}
    </div>
  );
};
