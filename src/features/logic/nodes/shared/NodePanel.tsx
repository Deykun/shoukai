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
        "min-w-[140px] max-w-[280px] relative",
        "p-1",
        "flex flex-col gap-2",
        // header radius 20 + p-1 + border 2 = concentric corners
        "bg-[#f5f9ef] rounded-[26px]",
        "duration-500",
        "group",
        "border-[2px] border-[#f5f9ef]",
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
