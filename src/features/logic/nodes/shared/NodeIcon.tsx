// import IconArrowForward from "@/components/Icons/IconArrowForward";
import IconArrowsSplit from "@/components/Icons/IconArrowsSplit";

import IconBookWithBookmark from "@/components/Icons/IconBookWithBookmark";
import IconNewTab from "@/components/Icons/IconNewTab";
import IconSearchInput from "@/components/Icons/IconSearchInput";
import { cn } from "@/utils/tailwind";
import { ShoukaiNodeType } from "../type/types";

type Props = {
  className?: string;
  type: ShoukaiNodeType | (string & {});
  isSelected?: boolean;
};

const ICON_BY_TYPE: Record<
  ShoukaiNodeType | "default",
  ({ className }: { className?: string }) => JSX.Element
> = {
  recipe: IconBookWithBookmark,
  // shortcut: IconArrowForward,
  start: IconSearchInput,
  if: IconArrowsSplit,
  open: IconNewTab,
  default: IconBookWithBookmark,
};

const NodeIcon = ({ className, type, isSelected = false }: Props) => {
  const Icon = ICON_BY_TYPE[type as ShoukaiNodeType] || ICON_BY_TYPE.default;

  return (
    <Icon
      className={cn(
        "size-4",
        "flex-shrink-0",
        "text-primary-contrast",
        "rounded-md",
        "bg-[#f5f9ef] p-1",
        "bg-[linear-gradient(to_bottom,#d1dc80_0%,#f5f9ef_100%)]",
        "bg-[length:100%_300%]",
        "bg-[position:0_100%]",
        "bg-no-repeat",
        "group-hover:bg-[length:100%_100%]",
        "duration-500",
        {
          "bg-[length:100%_100%]": isSelected,
        },

        className,
      )}
    />
  );
};

export default NodeIcon;
