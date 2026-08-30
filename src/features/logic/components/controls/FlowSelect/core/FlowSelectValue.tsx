import IconLogoSearch from "@/components/Icons/IconLogoSearch";
import ButtonIcon from "@/components/UI/ButtonIcon";
import ButtonText from "@/components/UI/ButtonText";
import { stringWithoutReferences } from "@/features/formula-input/utils/chunk-to-string";
import { cn } from "@/utils/tailwind";
import { useTranslation } from "react-i18next";

type Props = {
  wrapperClassName?: string;
  className?: string;
  size?: "small" | "normal" | "large";
  type?: "default" | "engine";
  value: unknown;
  onClick: () => void;
};

export const FlowSelectValue = ({
  wrapperClassName,
  className,
  size = "small",
  type = "default",
  value,
  onClick,
}: Props) => {
  const { t } = useTranslation();
  const valueAsArray = Array.isArray(value) ? value : [value];

  if (type === "engine") {
    return (
      <ButtonIcon
        wrapperClassName={wrapperClassName}
        className={className}
        size={size}
        onClick={onClick}
        label={t(`search.${value}`)}
        labelPosition="bottom"
      >
        <IconLogoSearch engine={value as string} />
      </ButtonIcon>
    );
  }

  const valueToShow = stringWithoutReferences(valueAsArray.join(" / "));

  return (
    <ButtonText
      wrapperClassName={wrapperClassName}
      className={className}
      size={size}
      onClick={onClick}
      canWrap
    >
      <span className={cn({ "opacity-50": !valueToShow })}>
        {valueToShow || "empty"}
      </span>
    </ButtonText>
  );
};
