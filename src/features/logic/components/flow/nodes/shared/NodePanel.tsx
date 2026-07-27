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
        "w-[220px] relative",
        "py-2 px-4",
        "rounded-[18px] shadow-sm",
        "border-[#f5f9ef] border",
        "mx-auto font-[500] text-[16px]",
        "hover:border-[#f5f9ef] hover:shadow-md",
        "duration-500",
        "bg-white rounded-[8px] tracking-wider",
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
