import { cn } from "@/utils/tailwind";
import NodeIcon from "./NodeIcon";
import { PropsWithChildren } from "react";
import { nodeSharedDataSchema } from "../type/schema";
import { FlowSelect } from "../../components/controls/FlowSelect/FlowSelect";
import { ShoukaiNodeType } from "../type/types";

type Props = {
  id: string;
  type: ShoukaiNodeType | (string & {});
  label: string;
};

const NodeHeader = ({
  id,
  type,
  label,
  children,
}: PropsWithChildren<Props>) => {
  return (
    <header className={cn("flex items-center gap-1.5", "px-1")}>
      <div className="w-full">
        <h2 className="text-primary-contrast">
          <FlowSelect
            size="large"
            className="!py-1 !px-1"
            nodeId={id}
            dataPath="label"
            value={label}
            schema={nodeSharedDataSchema}
          />
        </h2>
        {children}
      </div>
      <NodeIcon type={type} className="size-8" />
    </header>
  );
};

export default NodeHeader;
