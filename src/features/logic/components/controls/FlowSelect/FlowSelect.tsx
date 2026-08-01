import ButtonText from "@/components/UI/ButtonText";

// Easier to deal with 1 element array thank type control for bot
type Props = {
  value: string[];
  setValue: (value: string[]) => void;
};

export const FlowSelect = ({ value, setValue }: Props) => {
  return (
    <ButtonText onClick={() => setValue(value)} size="small">
      <span>{value.join(" / ")}</span>
    </ButtonText>
  );
};
