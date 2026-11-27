import { NodeHandleStatus } from "@/features/logic-debbuger/componetns/nodes/NodeHandleStatus";
import { cn } from "@/utils/tailwind";
import { Handle, HandleProps } from "@xyflow/react";
import { PropsWithChildren } from "react";

type Props = {
  nodeId: string;
  handleId: string;
  variant?: "default" | "horizontal";
  className?: string;
  top?: number;
  left?: number;
  right?: number;
  onClick?: () => void;
  isDisabled?: boolean;
} & Omit<HandleProps, "id">;

export const NodeHandle = (props: PropsWithChildren<Props>) => {
  const Tag = props.onClick ? "button" : "div";
  const {
    nodeId,
    handleId,
    variant = "default",
    className,
    children,
    onClick,
    isDisabled,
    ...handleProps
  } = props;

  if (variant === "horizontal") {
    return (
      <Tag
        data-node-id={nodeId}
        data-handle-id={handleId}
        className={cn(
          "group",
          "relative z-1 flex",
          "p-1 pr-3 -mr-1",
          "tracking-wider",
        )}
        onClick={onClick}
        type={onClick ? "button" : undefined}
      >
        <span
          className={cn(
            "flex gap-1 items-center ml-auto",
            "text-[12px] leading-0 font-[600]",
            "text-primary-contrast",
          )}
        >
          {children}
        </span>
        <NodeHandle
          {...props}
          variant="default"
          className="left-auto -right-0 top-1/2"
        />
        <NodeHandleStatus
          className={cn("absolute top-1/2 -translate-y-1/2 left-full", "ml-2")}
          nodeId={nodeId}
          handleId={handleId}
        />
      </Tag>
    );
  }

  if (isDisabled) {
    return null;
  }

  return (
    <Handle
      style={{
        width: 12,
        height: 12,
      }}
      {...handleProps}
      id={handleId}
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
