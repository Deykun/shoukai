import { Position } from "@xyflow/react";

import { ShoukaiShortcut } from "../type/schema";
import { NodeHandle } from "./NodeHandle";
import PanelFlow from "../../components/panel/PanelFlow";
import useOpenWithOutsideClick from "@/hooks/useOpenWithOutsideClick";
import { updateNode } from "../../stores/useDiagramStore";
import { getDeepMerged, getObjectFromPath } from "../../utils/object";
import { VARIABLE_REFERENCES } from "../../constants";
import Field from "@/components/UI/Field";
import { NO_BREAK_SPACE } from "@/utils/text";
import { getUnique } from "@/utils/array";
import { FormulaBuilder } from "@/features/formula-builder/components/FormulaBuilder";
import { FlowSelectSearchToOpen } from "../../components/controls/FlowSelectSearchToOpen/FlowSelectSearchToOpen";

type Props = {
  nodeId: string;
  dataPath: string;
  className?: string;
  shortcut: ShoukaiShortcut;
};

export const NodeHandleShortcut = ({ nodeId, dataPath, shortcut }: Props) => {
  const { setInsideRef, isOpen, setIsOpen } = useOpenWithOutsideClick(false);

  return (
    <>
      <NodeHandle
        variant="horizontal"
        type="source"
        position={Position.Right}
        onClick={() => setIsOpen(!isOpen)}
        isDisabled
      >
        <span className="text-[8px] mr-auto">
          {shortcut.triggers.join(", ")}
        </span>{" "}
        <span>{shortcut.name || NO_BREAK_SPACE}</span>
        {/* <IconNewTab className="size-3" /> */}
      </NodeHandle>
      <PanelFlow insideRef={setInsideRef} isOpen={isOpen}>
        <Field.Wrapper>
          <Field label="Shortcut name">
            <FormulaBuilder
              value={shortcut.name}
              onChange={(next) => {
                updateNode(nodeId, getObjectFromPath(`${dataPath}.name`, next));
              }}
              references={["{{phrase}}", "{{lang}}"]}
            />
          </Field>
          <Field
            label="Triggers"
            valueDescription="When query starts or ends with."
          >
            <FormulaBuilder
              value={shortcut.triggers.join(" ")}
              onChange={(next) => {
                updateNode(
                  nodeId,
                  getObjectFromPath(
                    `${dataPath}.triggers`,
                    getUnique(next.split(" ")),
                  ),
                );
              }}
              references={VARIABLE_REFERENCES.EMPTY}
            />
          </Field>
          <Field label="Open">
            {/* {shortcut.type}
            {" - "}
            {shortcut.searchEngine} */}
            <FlowSelectSearchToOpen
              value={shortcut}
              onChange={({ type, searchEngine }) => {
                const next = getDeepMerged(
                  getObjectFromPath(`${dataPath}.type`, type),
                  getObjectFromPath(`${dataPath}.searchEngine`, searchEngine),
                );

                updateNode(nodeId, next);
              }}
            />
          </Field>
          <Field label="With phrase">
            <FormulaBuilder
              value={shortcut.phrase}
              onChange={(next) => {
                updateNode(
                  nodeId,
                  getObjectFromPath(`${dataPath}.phrase`, next),
                );
              }}
              references={VARIABLE_REFERENCES.DEFAULT}
            />
          </Field>
        </Field.Wrapper>
      </PanelFlow>
    </>
  );
};
