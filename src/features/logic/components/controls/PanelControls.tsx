import { cn } from "@/utils/tailwind";
import { PropsWithChildren } from "react";
import { createPortal } from "react-dom";

type Props = {
  outsideRef: (element: HTMLElement | null) => void;
  className?: string;
};

const PanelControls = ({
  outsideRef,
  className = "",
  children,
}: PropsWithChildren<Props>) => {
  return createPortal(
    <div
      ref={outsideRef}
      className={cn(
        "fixed bottom-0 left-0 z-10",
        "w-full",
        "bg-[#f5f9ef] rounded-t-xl",
        "translate-y-0 starting:translate-y-full",
        "transition-transform duration-300 ease-in-out",
        className,
      )}
    >
      <div className={cn("max-w-screen-md mx-auto p-4")}>{children}</div>
    </div>,
    document.body,
  );
};

export default PanelControls;
