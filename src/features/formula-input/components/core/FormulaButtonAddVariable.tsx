import IconBrackets from "@/components/Icons/IconBrackets";
import ButtonIcon from "@/components/UI/ButtonIcon";
import { memo } from "react";

type Props = {
  className?: string;
  onClick: () => void;
  isActive?: boolean;
  isDisabled?: boolean;
};

const FormulaButtonAddVariable = ({
  className,
  onClick,
  isActive,
  isDisabled,
}: Props) => {
  return (
    <ButtonIcon
      wrapperClassName={className}
      label="Add variable"
      labelPosition="top"
      onClick={onClick}
      isActive={isActive}
      isDisabled={isDisabled}
    >
      <IconBrackets />
    </ButtonIcon>
  );
};

FormulaButtonAddVariable.displayName = "FormulaButtonAddVariable";

export default memo(FormulaButtonAddVariable);
