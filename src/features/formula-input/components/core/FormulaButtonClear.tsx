import IconErase from "@/components/Icons/IconErase";
import ButtonIcon from "@/components/UI/ButtonIcon";
import { memo } from "react";

type Props = {
  className?: string;
  onClick: () => void;
  isActive?: boolean;
  isDisabled?: boolean;
};

const FormulaButtonClear = ({
  className,
  onClick,
  isActive,
  isDisabled,
}: Props) => {
  return (
    <ButtonIcon
      wrapperClassName={className}
      label="Clear"
      labelPosition="top"
      onClick={onClick}
      isActive={isActive}
      isDisabled={isDisabled}
    >
      <IconErase />
    </ButtonIcon>
  );
};

FormulaButtonClear.displayName = "FormulaButtonClear";

export default memo(FormulaButtonClear);
