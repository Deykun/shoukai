import IconSearchSettings from "@/components/Icons/IconSearchSettings";
import ButtonIcon from "@/components/UI/ButtonIcon";
import { cn } from "@/utils/tailwind";
import { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  className?: string;
  isSelected: boolean;
  onEdit?: () => void;
};

const NodeOptions = ({
  className,
  isSelected,
  onEdit,
  children,
}: PropsWithChildren<Props>) => {
  const { t } = useTranslation();

  return (
    <aside
      className={cn(
        "absolute",
        "top-0.5 right-1",
        "z-0",
        "flex justify-end",
        "pointer-events-none opacity-0",
        "group-hover:pointer-events-auto group-hover:opacity-100",
        {
          "pointer-events-auto opacity-100": isSelected,
        },
        "bg-[#f5f9ef]",
        "duration-300",
        className,
      )}
    >
      {onEdit && (
        <ButtonIcon
          size="small"
          onClick={onEdit}
          label={t("search.settings")}
          labelPosition="top"
          // isActive={isModalOpen}
        >
          <IconSearchSettings />
        </ButtonIcon>
      )}
    </aside>
  );
};

export default NodeOptions;
