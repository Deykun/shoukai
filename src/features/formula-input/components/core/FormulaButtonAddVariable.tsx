import IconBrackets from "@/components/Icons/IconBrackets";
import ButtonIcon from "@/components/UI/ButtonIcon";
import { memo } from "react";

type Props = {
  className?: string;
  onClick: () => void;
  isActive?: boolean;
};

const FormulaButtonAddVariable = ({ className, onClick, isActive }: Props) => {
  return (
    <ButtonIcon
      wrapperClassName={className}
      label="Add variable"
      labelPosition="top"
      onClick={onClick}
      isActive={isActive}
    >
      <IconBrackets />
    </ButtonIcon>
  );
};

FormulaButtonAddVariable.displayName = "FormulaButtonAddVariable";

export default memo(FormulaButtonAddVariable);
