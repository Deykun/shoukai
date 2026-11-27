import { Position } from "@xyflow/react";

import { ShoukaiShortcut } from "../type/schema";
import { NodeHandle } from "./NodeHandle";
import PanelFlow from "../../components/panel/PanelFlow";
import useOpenWithOutsideClick from "@/hooks/useOpenWithOutsideClick";
import { VARIABLE_REFERENCES } from "../../constants";
import Field from "@/components/UI/Field";
import { NO_BREAK_SPACE } from "@/utils/text";
import { getUnique } from "@/utils/array";
import { FormulaBuilder } from "@/features/formula-builder/components/FormulaBuilder";
import { FlowSelectSearchToOpen } from "../../components/controls/FlowSelectSearchToOpen/FlowSelectSearchToOpen";
import { FlowSelectShortcutStrategy } from "../../components/controls/FlowSelectShortcutStrategy/FlowSelectShortcutStrategy";
import IconSearchType from "@/components/Icons/IconSearchType";
import { cn } from "@/utils/tailwind";
import IconErase from "@/components/Icons/IconErase";
import ButtonText from "@/components/UI/ButtonText";

type Props = {
  nodeId: string;
  onChange: (patch: Partial<ShoukaiShortcut>) => void;
  className?: string;
  shortcut: ShoukaiShortcut;
  onRemove?: () => void;
};

export const NodeHandleShortcut = ({
  nodeId,
  onChange,
  shortcut,
  onRemove,
}: Props) => {
  const { setInsideRef, isOpen, setIsOpen } = useOpenWithOutsideClick(false);

  return (
    <>
      <NodeHandle
        nodeId={nodeId}
        handleId={shortcut.id}
        variant="horizontal"
        type="source"
        position={Position.Right}
        onClick={() => setIsOpen(!isOpen)}
        isDisabled
      >
        <span
          className={cn(
            "flex-shrink-0 max-w-[120px]",
            "mr-auto",
            "text-[8px] line-clamp-1 break-all",
          )}
        >
          {shortcut.triggers.join(", ")}
        </span>{" "}
        <span className="line-clamp-1 break-all">
          {shortcut.name || NO_BREAK_SPACE}
        </span>
        <div className="ml-0.5 -mr-0 flex-shrink-0">
          <IconSearchType type={shortcut.type} className={cn("size-3")} />
        </div>
      </NodeHandle>
      <PanelFlow insideRef={setInsideRef} isOpen={isOpen}>
        <Field.Wrapper>
          <Field label="Shortcut name">
            <FormulaBuilder
              value={shortcut.name}
              onChange={(next) => {
                onChange({ name: next });
              }}
              references={VARIABLE_REFERENCES.DEFAULT}
            />
          </Field>
          <Field
            label="Triggers"
            valueDescription="When query starts or ends with."
          >
            <FormulaBuilder
              value={shortcut.triggers.join(" ")}
              onChange={(next) => {
                onChange({
                  triggers: getUnique(
                    next.split(" ").flatMap((nextPart) => nextPart.split(",")),
                  ),
                });
              }}
              references={VARIABLE_REFERENCES.EMPTY}
            />
          </Field>
          <Field label="Detection">
            <FlowSelectShortcutStrategy
              value={shortcut.detectionStrategy}
              onChange={(detectionStrategy) => {
                onChange({ detectionStrategy });
              }}
            />
          </Field>
          <Field label="Open">
            <FlowSelectSearchToOpen
              value={shortcut}
              onChange={({ type, searchEngine }) => {
                onChange({ type, searchEngine } as Partial<ShoukaiShortcut>);
              }}
            />
          </Field>
          <Field label="With phrase">
            <FormulaBuilder
              value={shortcut.phrase}
              onChange={(next) => {
                onChange({ phrase: next });
              }}
              references={VARIABLE_REFERENCES.DEFAULT}
            />
          </Field>
          {onRemove && (
            <Field label="Options">
              <ButtonText onClick={onRemove} size="small">
                <IconErase />
                <span>Remove shortcut</span>
              </ButtonText>
            </Field>
          )}
        </Field.Wrapper>
      </PanelFlow>
    </>
  );
};
