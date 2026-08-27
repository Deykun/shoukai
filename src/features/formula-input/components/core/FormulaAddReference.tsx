import IconBrackets from "@/components/Icons/IconBrackets";
import { cn } from "@/utils/tailwind";
import { memo, useState } from "react";

const FormulaButtonAddReference = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  return (
    <button
      type="button"
      className={cn("group", "relative", "flex flex-col items-center")}
      onClick={toggle}
    >
      <span
        className={cn(
          "absolute top-1/2 left-1/2",
          "-translate-x-1/2 -translate-y-1/2",
          "scale-x-0 group-hover:scale-x-100",
          "rounded-md",
          "bg-primary-contrast text-primary",
          "duration-300",
          "ease-in-out",
          "delay-100",
          "max-size-1 group-hover:size-5",
        )}
      />
      <span
        className={cn(
          "absolute top-1/2 left-1/2",
          "-translate-x-1/2 -translate-y-1/2",
          "opacity-0 group-hover:opacity-100",
          "scale-50 group-hover:scale-100",
          "rounded-md",
          "text-primary",
          "duration-300",
          "ease-in-out",
          "max-w-4 group-hover:size-4",
          "pointer-events-none",
        )}
      >
        <IconBrackets className="size-4" />
      </span>
      <span className={cn("bg-transparent w-1 h-4")} />
    </button>
  );
};

FormulaButtonAddReference.displayName = "FormulaButtonAddReference";

export default memo(FormulaButtonAddReference);
