import { Position } from "@xyflow/react";

import { shortcutSchema, ShoukaiShortcut } from "../type/schema";
import { NodeHandle } from "./NodeHandle";
import IconNewTab from "@/components/Icons/IconNewTab";
import PanelFlow from "../../components/panel/PanelFlow";
import useOpenWithOutsideClick from "@/hooks/useOpenWithOutsideClick";
import { FlowSelect } from "../../components/controls/FlowSelect/FlowSelect";
import FormulaInput from "@/features/formula-input/components/FormulaInput";
import { stringToChunks } from "@/features/formula-input/utils/string-to-chunk";
import { updateNode } from "../../stores/useDiagramStore";
import { getObjectFromPath } from "../../utils/object";
import { chunksToString } from "@/features/formula-input/utils/chunk-to-string";

type Props = {
  nodeId: string;
  dataPath: string;
  className?: string;
  shortcut: ShoukaiShortcut;
};

export const NodeHandleShortcut = ({ nodeId, dataPath, shortcut }: Props) => {
  const { outsideRef, isOpen, setIsOpen } = useOpenWithOutsideClick(false);
  const { name, triggers, type, searchEngine, phrase } = shortcut;
  return (
    <>
      <NodeHandle
        variant="horizontal"
        type="source"
        position={Position.Right}
        onClick={() => setIsOpen(!isOpen)}
        isDisabled
      >
        <span className="text-[8px] mr-auto">{triggers.join(",")}</span>{" "}
        <span>{name}</span>
        {/* <IconNewTab className="size-3" /> */}
      </NodeHandle>
      <PanelFlow outsideRef={outsideRef} isOpen={isOpen}>
        <h4>Shortcut name</h4>
        {shortcut.name}
        <h4>When query starts or ends with:</h4>
        {shortcut.triggers.map((trigger) => (
          <span>{trigger}</span>
        ))}
        <h4>Open search</h4>
        {shortcut.type}
        <h4>In engine</h4>
        {shortcut.searchEngine}
        <h4>With phrase (without a trigger):</h4>
        <FormulaInput
          value={stringToChunks(
            typeof shortcut.phrase === "string" ? shortcut.phrase : "",
          )}
          onChange={(next) => {
            updateNode(
              nodeId,
              getObjectFromPath(`${dataPath}.phrase`, chunksToString(next)),
            );
          }}
        />
      </PanelFlow>
    </>
  );
};
