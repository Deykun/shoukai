import { ShoukaiNodeType } from "@/features/logic/components/flow/nodes/type/types";
import { cn } from "@/utils/tailwind";
import NodeIcon from "./NodeIcon";
import { PropsWithChildren } from "react";

type Props = {
  type: ShoukaiNodeType | (string & {});
  label: string;
};

const NodeHeader = ({ type, label, children }: PropsWithChildren<Props>) => {
  return (
    <header className={cn("flex items-center gap-1.5", "px-1")}>
      <div className="w-full">
        <h2 className="text-primary-contrast font-[600] text-md leading-0">
          {label}
        </h2>
        {children}
      </div>
      <NodeIcon type={type} className="size-8" />
    </header>
  );
};

export default NodeHeader;
