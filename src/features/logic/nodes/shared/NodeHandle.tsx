import { cn } from "@/utils/tailwind";
import { Handle, HandleProps } from "@xyflow/react";
import { PropsWithChildren } from "react";

type Props = {
  variant?: "default" | "horizontal";
  className?: string;
  top?: number;
  left?: number;
  right?: number;
} & HandleProps;

export const NodeHandle = (props: PropsWithChildren<Props>) => {
  const { variant = "default", className, children } = props;

  if (variant === "horizontal") {
    return (
      <div
        className={cn(
          "relative z-1 flex",
          "p-1 px-2",
          "duration-500",
          "bg-[#82a849] rounded-[4px] tracking-wider",
        )}
      >
        <span
          className={cn(
            "text-[12px] text-white leading-0",
            "flex gap-1 items-center ml-auto",
          )}
        >
          {children}
        </span>
        <NodeHandle
          {...props}
          variant="default"
          className="left-auto -right-1 top-1/2"
        />
      </div>
    );
  }

  return (
    <Handle
      style={{
        width: 12,
        height: 12,
      }}
      {...props}
      children={null}
      className={cn(
        "z-5",
        "bg-white rounded-[8px] tracking-wider",
        "bg-primary-contrast",
        "border-[#82a849] border-[3px]",
        // "top-0"
        "left-0 top-5",
        className,
      )}
    />
  );
};
