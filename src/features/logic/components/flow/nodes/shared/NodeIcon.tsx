import IconArrowForward from "@/components/Icons/IconArrowForward";

import IconBookWithBookmark from "@/components/Icons/IconBookWithBookmark";
import IconSearchInput from "@/components/Icons/IconSearchInput";
import { ShoukaiNodeType } from "@/features/logic/types";
import { cn } from "@/utils/tailwind";

type Props = {
  type: ShoukaiNodeType | (string & {});
};

const ICON_BY_TYPE: Record<
  ShoukaiNodeType | "default",
  ({ className }: { className?: string }) => JSX.Element
> = {
  recipe: IconBookWithBookmark,
  shortcut: IconArrowForward,
  start: IconSearchInput,
  default: IconBookWithBookmark,
};

const NodeIcon = ({ type }: Props) => {
  const Icon = ICON_BY_TYPE[type as ShoukaiNodeType] || ICON_BY_TYPE.default;

  return (
    <span
      className={cn(
        // "absolute top-0 left-2 -translate-y-1/2",
        "flex-shrink-0",
        "size-7 inline-flex flex-col items-center justify-center",
        "bg-[#f5f9ef]",
        "border-[#f5f9ef] border",
        "mx-auto font-[500] text-[16px]",
        "hover:border-[#f5f9ef] hover:shadow-md",
        "duration-500",
        "bg-white rounded-[8px] tracking-wider",
        "text-primary-contrast bg-[#f0fdeb] border-[#d1dc80]",
      )}
    >
      <Icon className="size-4" />
    </span>
  );
};

export default NodeIcon;
