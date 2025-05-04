import clsx from "clsx";

import IconCheckboxFrame from "@/components/Icons/IconCheckboxFrame";
import IconCheck from "@/components/Icons/IconCheck";

import ButtonIcon from "./ButtonIcon";

import "./Checkbox.scss";

type Props = {
  className?: string;
  size?: "small" | "large" | "normal";
  isActive?: boolean;
  onChange: (value: boolean) => void;
  frameIcon?: React.ElementType;
};

const Checkbox = ({
  className,
  size,
  isActive = false,
  onChange,
  frameIcon,
}: Props) => {
  const Frame = frameIcon ?? IconCheckboxFrame;

  return (
    <ButtonIcon
      className={className}
      size={size}
      isActive={isActive}
      onClick={() => onChange(!isActive)}
    >
      <Frame
        className={clsx(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
          "duration-300",
          {
            "scale-0 opacity-0": isActive,
            "scale-100 opacity-100": !isActive,
          }
        )}
      />
      <IconCheck
        className={clsx(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
          "duration-300",
          {
            "scale-0 opacity-0": !isActive,
            "scale-100 opacity-100": isActive,
          }
        )}
      />
    </ButtonIcon>
  );
};

export default Checkbox;
