import { cn } from "@/utils/tailwind";
import NodeIcon from "./NodeIcon";
import { PropsWithChildren } from "react";
import { nodeSharedDataSchema } from "../type/schema";
import { FlowSelect } from "../../components/controls/FlowSelect/FlowSelect";
import { ShoukaiNodeType } from "../type/types";

type Props = {
  id: string | undefined;
  type: ShoukaiNodeType | (string & {});
  label: string;
  isSelected?: boolean;
};

const NodeHeader = ({
  id,
  type,
  label,
  children,
  isSelected = false,
}: PropsWithChildren<Props>) => {
  return (
    <header className={cn("flex items-center gap-1.5", "px-1")}>
      <div className="w-full">
        <h2 className="text-primary-contrast">
          {id ? (
            <FlowSelect
              size="large"
              className="!py-1 !px-1"
              nodeId={id}
              dataPath="label"
              value={label}
              schema={nodeSharedDataSchema}
            />
          ) : (
            label
          )}
        </h2>
        {children}
      </div>
      <NodeIcon type={type} className="size-8 -mt-8" isSelected={isSelected} />
    </header>
  );
};

export default NodeHeader;
