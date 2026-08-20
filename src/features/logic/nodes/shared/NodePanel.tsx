import { cn } from "@/utils/tailwind";

type Props = {
  className?: string;
  children: React.ReactNode;
  isSelected?: boolean;
};

const NodePanel = ({ children, className = "", isSelected = false }: Props) => {
  return (
    <div
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
    >
      {children}
    </div>
  );
};

export default NodePanel;
