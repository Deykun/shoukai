import { updateNode } from "@/features/logic/stores/useDiagramStore";
import { getObjectFromPath } from "@/features/logic/utils/object";
import type {
  ObjectPath,
  ObjectPathValue,
} from "@/features/logic/utils/typescript";
import useOpenWithOutsideClick from "@/hooks/useOpenWithOutsideClick";
import { FlowSelectOptions } from "./core/FlowSelectOptions";
import { FlowSelectValue } from "./core/FlowSelectValue";
import { memo } from "react";
import z from "zod";

type Props<
  TSchema extends z.ZodObject,
  TPath extends ObjectPath<z.infer<TSchema>>,
> = {
  type?: "default" | "engine";
  nodeId: string;
  schema: TSchema;
  dataPath: TPath;
  value: ObjectPathValue<z.infer<TSchema>, TPath>;
};

const getFieldAtPath = (schema: z.ZodObject, dataPath: string) =>
  dataPath.split(".").reduce<z.ZodType | undefined>((field, key) => {
    const shape = field instanceof z.ZodObject ? field.shape : undefined;

    return shape?.[key];
  }, schema);

const getOptions = (schema: z.ZodObject, dataPath: string): string[] => {
  const field = getFieldAtPath(schema, dataPath);

  return field instanceof z.ZodEnum ? (field.options as string[]) : [];
};

function FlowSelectComponent<
  TSchema extends z.ZodObject,
  TPath extends ObjectPath<z.infer<TSchema>>,
>({
  type = "default",
  nodeId,
  dataPath,
  value,
  schema,
}: Props<TSchema, TPath>) {
  const { outsideRef, isOpen, setIsOpen } = useOpenWithOutsideClick(false);
  const options = getOptions(schema, dataPath);

  return (
    <div className="relative">
      <FlowSelectValue
        type={type}
        value={value}
        onClick={() => setIsOpen(true)}
      />
      {isOpen && (
        <FlowSelectOptions
          outsideRef={outsideRef}
          options={options}
          value={value}
          onSelect={(option) => {
            updateNode(nodeId, getObjectFromPath(dataPath, option));
            setIsOpen(false);
          }}
        />
      )}
    </div>
  );
}

// memo() drops generics, cast keeps the inference at call sites
export const FlowSelect = memo(
  FlowSelectComponent,
) as typeof FlowSelectComponent;
