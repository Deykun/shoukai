import { cn } from "@/utils/tailwind";
import { PropsWithChildren } from "react";

type Props = {
  className?: string;
  isSelected?: boolean;
};

const NodeRichMessage = ({ className, children }: PropsWithChildren<Props>) => {
  return (
    <div
      className={cn(
        "max-w-[250px] px-2 text-s",
        "text-[#979f8a] text-xs leading-0",
        "flex flex-wrap gap-0.25 items-center justify-center",
        "px-2",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default NodeRichMessage;
