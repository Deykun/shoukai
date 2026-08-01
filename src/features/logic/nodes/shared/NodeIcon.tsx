import IconArrowForward from "@/components/Icons/IconArrowForward";
import IconArrowsSplit from "@/components/Icons/IconArrowsSplit";

import IconBookWithBookmark from "@/components/Icons/IconBookWithBookmark";
import IconNewTab from "@/components/Icons/IconNewTab";
import IconSearchInput from "@/components/Icons/IconSearchInput";
import { ShoukaiNodeType } from "@/features/logic/components/flow/nodes/type/types";
import { cn } from "@/utils/tailwind";

type Props = {
  className?: string;
  type: ShoukaiNodeType | (string & {});
};

const ICON_BY_TYPE: Record<
  ShoukaiNodeType | "default",
  ({ className }: { className?: string }) => JSX.Element
> = {
  recipe: IconBookWithBookmark,
  shortcut: IconArrowForward,
  start: IconSearchInput,
  if: IconArrowsSplit,
  open: IconNewTab,
  default: IconBookWithBookmark,
};

const NodeIcon = ({ className, type }: Props) => {
  const Icon = ICON_BY_TYPE[type as ShoukaiNodeType] || ICON_BY_TYPE.default;

  return (
    <Icon
      className={cn(
        "size-4",
        "flex-shrink-0",
        "text-primary-contrast",
        className,
      )}
    />
  );
};

export default NodeIcon;
