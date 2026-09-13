import { useCallback } from "react";

import { setDraggedType } from "../../../stores/useDragAndDropStore";
import { cn } from "@/utils/tailwind";
import {
  PALETTE_NODES_TYPES,
  ShoukaiNodeType,
} from "../../../nodes/type/types";
import ButtonIcon from "@/components/UI/ButtonIcon";
import useOpenWithOutsideClick from "@/hooks/useOpenWithOutsideClick";
import PanelFlow from "../../panel/PanelFlow";
import { defaultDataByNodeType } from "@/features/logic/nodes/type/nodeTypes";
import NodePanel from "@/features/logic/nodes/shared/NodePanel";
import NodeHeader from "@/features/logic/nodes/shared/NodeHeader";
import IconLibrary from "@/components/Icons/IconLibrary";

const Palette = () => {
  const { outsideRef, isOpen, setIsOpen } = useOpenWithOutsideClick(false);

  const onDragStart = useCallback(
    (event: React.DragEvent<HTMLDivElement>, nodeType: ShoukaiNodeType) => {
      setDraggedType(nodeType);
      event.dataTransfer.effectAllowed = "move";
    },
    [],
  );

  return (
    <>
      <ButtonIcon
        label="Add node"
        labelPosition="right"
        onClick={() => setIsOpen(!isOpen)}
        isActive={isOpen}
      >
        <IconLibrary />
      </ButtonIcon>
        <PanelFlow outsideRef={outsideRef} isOpen={isOpen}>
          <h3 className="mb-3">Palette</h3>
          <div
            className={cn(
              "container",
              "grid [@media(min-width:860px)]:grid-cols-3 gap-4",
            )}
          >
            {PALETTE_NODES_TYPES.map((type) => (
              <NodePanel
                key={type}
                nodeId={undefined}
                className={cn(
                  "border-[#d3d3d3]",
                  "cursor-grab active:cursor-grabbing",
                )}
                onDragStart={(event) => onDragStart(event, type)}
                draggable
              >
                <NodeHeader
                  id={undefined}
                  type={type}
                  label={defaultDataByNodeType[type].label}
                />
              </NodePanel>
            ))}
          </div>
        </PanelFlow>
    </>
  );
};

export default Palette;
