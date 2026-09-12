import IconInfo from "@/components/Icons/IconInfo";
import ButtonIcon from "@/components/UI/ButtonIcon";
import useOpenWithOutsideClick from "@/hooks/useOpenWithOutsideClick";
import { cn } from "@/utils/tailwind";
import { PropsWithChildren } from "react";
import PanelFlow from "../../components/panel/PanelFlow";

type Props = {
  className?: string;
  label?: string;
  about?: string;
};

const NodeHandlesWrapper = ({
  className = "",
  label,
  about,
  children,
}: PropsWithChildren<Props>) => {
  const { outsideRef, isOpen, setIsOpen } = useOpenWithOutsideClick(false);

  return (
    <div className={cn("flex flex-col gap-1", "mt-1", className)}>
      {label && (
        <h3
          className={cn(
            "flex align-middle justify-end items-center gap-1",
            "text-[#979f8a] text-[8px] -mb-1 pr-2 text-right leading-0",
          )}
        >
          {about && (
            <ButtonIcon
              size="tiny"
              label="About"
              labelPosition="top"
              onClick={() => setIsOpen(!isOpen)}
              isActive={isOpen}
            >
              <IconInfo />
            </ButtonIcon>
          )}
          {label}
          <PanelFlow outsideRef={outsideRef} isOpen={isOpen}>
            <h3>{label}</h3>
            <p className={cn("text-[#979f8a] text-sm")}>{about}</p>
          </PanelFlow>
        </h3>
      )}
      <div
        className={cn(
          "flex flex-col justify-center gap-0.5",
          "ml-auto",
          "divide-y divide-border divide-[#d1dc80]",
          "text-right",
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default NodeHandlesWrapper;
