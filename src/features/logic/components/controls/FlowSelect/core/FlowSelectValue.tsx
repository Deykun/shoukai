import IconLogoSearch from "@/components/Icons/IconLogoSearch";
import ButtonIcon from "@/components/UI/ButtonIcon";
import ButtonText from "@/components/UI/ButtonText";
import { useTranslation } from "react-i18next";

type Props = {
  className?: string;
  size?: "small" | "normal" | "large";
  type?: "default" | "engine";
  value: unknown;
  onClick: () => void;
};

export const FlowSelectValue = ({
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

  return (
    <ButtonText className={className} size={size} onClick={onClick}>
      <span>{valueAsArray.join(" / ")}</span>
    </ButtonText>
  );
};
