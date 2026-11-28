import { cn } from "@/utils/tailwind";
import NodeIcon from "./NodeIcon";
import { PropsWithChildren } from "react";
import { nodeSharedDataSchema } from "../type/schema";
import { FlowSelect } from "../../components/controls/FlowSelect/FlowSelect";
import { ShoukaiNodeType } from "../type/types";
import ButtonIcon from "@/components/UI/ButtonIcon";
import IconAdjustAlt from "@/components/Icons/IconAdjustAlt";

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
    <header
      className={cn(
        "flex items-center gap-1.5",
        "p-1",
        // = full pill for one line, keeps sane corners when label wraps
        "rounded-[20px]",
        "bg-[#e8eedd]",
      )}
    >
      <NodeIcon type={type} isSelected={isSelected} />
      <div className="min-w-0 flex-1">
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
            <span className="block pl-1 pr-3">{label}</span>
          )}
        </h2>
        {children}
      </div>
      {id && (
        <ButtonIcon className="!rounded-full">
          <IconAdjustAlt />
        </ButtonIcon>
      )}
    </header>
  );
};

export default NodeHeader;
