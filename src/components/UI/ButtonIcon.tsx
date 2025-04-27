import clsx from "clsx";
import { cn } from "@/utils/tailwind";

import "./ButtonIcon.scss";

type Props = {
  id?: string;
  size?: "small" | "large" | "normal";
  className?: string;
  wrapperClassName?: string;
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  isDisabled?: boolean;
  isActive?: boolean;
  title?: string;
  label?: string;
  labelPosition?:
    | "left"
    | "right"
    | "bottom"
    | "top"
    | "bottomRight"
    | "bottomLeft";
  tagName?: "span";
  type?: "button" | "submit";
};

const ButtonIcon = ({
  id,
  className,
  wrapperClassName,
  children,
  onClick,
  href,
  target,
  rel,
  isDisabled = false,
  isActive = false,
  title,
  label,
  labelPosition = "left",
  size,
  tagName,
  type = "button",
}: Props) => {
  const TagName = tagName ?? (href ? "a" : "button");

  return (
    <span
      className={cn("relative ui-button-icon", {
        [wrapperClassName || ""]: wrapperClassName,
        "ui-button-icon--active": isActive,
        "ui-tooltip-wrapper": label,
        [`ui-tooltip-wrapper--${size} ui-button-icon--${size}`]: size,
      })}
    >
      <TagName
        id={id}
        onClick={onClick}
        type={type}
        disabled={isDisabled}
        className={className}
        title={title}
        href={href}
        target={target}
        rel={rel}
      >
        {children}
        {label && (
          <span
            className={clsx("ui-tooltip", {
              [`ui-tooltip--${labelPosition}`]: labelPosition,
            })}
          >
            {label}
          </span>
        )}
      </TagName>
    </span>
  );
};

export default ButtonIcon;
