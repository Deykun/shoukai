import { cn } from "@/utils/tailwind";
import { PropsWithChildren } from "react";

type Props = {
  className?: string;
};

const NodeHandlesWrapper = ({
  className = "",
  children,
}: PropsWithChildren<Props>) => {
  return (
    <div
      className={cn(
        "flex flex-col justify-center gap-0.5",
        "ml-auto",
        "divide-y divide-border divide-[#d1dc80]",
        "text-right",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default NodeHandlesWrapper;
