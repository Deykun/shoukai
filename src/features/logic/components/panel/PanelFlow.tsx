import useEffectChange from "@/hooks/useEffectChange";
import { cn } from "@/utils/tailwind";
import { PropsWithChildren, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Props = {
  outsideRef: (element: HTMLElement | null) => void;
  classNameWrapper?: string;
  className?: string;
  isOpen: boolean;
};

const PanelFlow = ({
  outsideRef,
  classNameWrapper = "",
  className = "",
  children,
  isOpen,
}: PropsWithChildren<Props>) => {
  const closingTimeoutRef = useRef<number | null>(null);
  const [isOpenDeferred, setIsOpenDeferred] = useState(isOpen);

  useEffectChange(() => {
    // Clear previous timeout
    if (closingTimeoutRef.current) {
      clearTimeout(closingTimeoutRef.current);
    }

    if (isOpen) {
      setIsOpenDeferred(true);

      return;
    }

    closingTimeoutRef.current = window.setTimeout(() => {
      setIsOpenDeferred(false);
    }, 500);
  }, [isOpen]);

  if (!isOpenDeferred) {
    return null;
  }

  return createPortal(
    <div
      ref={outsideRef}
      className={cn(
        "fixed bottom-0 left-0 z-10",
        "w-full",
        "bg-[#f5f9ef] rounded-t-xl",
        "flow-ui-border",
        "translate-y-0 starting:translate-y-full",
        "transition-transform duration-300 ease-in-out",
        {
          "translate-y-full": !isOpen,
        },

        classNameWrapper,
      )}
    >
      <div className={cn("max-w-screen-md mx-auto p-4", className)}>
        {children}
      </div>
    </div>,
    document.body,
  );
};

export default PanelFlow;
