import { cn } from "@/utils/tailwind";

type Props = {
  nodeId: string | undefined;
  className?: string;
  children: React.ReactNode;
  isSelected?: boolean;
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const NodePanel = ({
  nodeId,
  className = "",
  children,
  isSelected = false,
  ...props
}: Props) => {
  return (
    <div
      data-node-id={nodeId}
      className={cn(
        "min-w-[140px] relative",
        "p-1",
        "flex flex-col gap-2",
        "bg-[#f5f9ef] rounded-md",
        "duration-500",
        "group",
        "border-[1px] border-[#f5f9ef]",
        "hover:border-[#d1dc80]",
        {
          "border-[#d1dc80]": isSelected,
        },
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default NodePanel;
