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
        className,
        {
          "border-[#d1dc80] hover:border-[#d1dc80]": isSelected,
        },
      )}
    >
      {children}
    </div>
  );
};

export default NodePanel;
