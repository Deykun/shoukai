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
        "w-full max-w-[100px] ml-auto",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default NodeHandlesWrapper;
