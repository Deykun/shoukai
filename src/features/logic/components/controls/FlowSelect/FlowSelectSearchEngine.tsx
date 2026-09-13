import IconLogo from "@/components/Icons/IconLogo";
import ButtonText from "@/components/UI/ButtonText";

// Easier to deal with 1 element array thank type control for bot
type Props = {
  value: string[];
  setValue: (value: string[]) => void;
};

export const FlowSelectSearchEngine = ({ value, setValue }: Props) => {
  return (
    <ButtonText onClick={() => setValue(value)} size="small">
      <IconLogo id={value[0]} />
    </ButtonText>
  );
};
