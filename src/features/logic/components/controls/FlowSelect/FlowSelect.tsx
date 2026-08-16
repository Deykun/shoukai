import IconLogoSearch from "@/components/Icons/IconLogoSearch";
import ButtonText from "@/components/UI/ButtonText";
import { updateNode } from "@/features/logic/stores/useDiagramStore";
import { getObjectFromPath } from "@/features/logic/utils/object";
import type {
  ObjectPath,
  ObjectPathValue,
} from "@/features/logic/utils/typescript";
import useOutsideClick from "@/hooks/useOutsideClick";
import { cn } from "@/utils/tailwind";
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
  const { outsideRef, isOpen, setIsOpen } = useOutsideClick(false);
  const valueAsArray = Array.isArray(value) ? value : [value];
  const options = getOptions(schema, dataPath);

  return (
    <div className="relative">
      <ButtonText onClick={() => setIsOpen(true)} size="small">
        {type === "engine" ? (
          <IconLogoSearch engine={value as string} />
        ) : (
          <span>{valueAsArray.join(" / ")}</span>
        )}
      </ButtonText>
      {isOpen && (
        <div
          ref={outsideRef}
          className={cn(
            "absolute top-full left-1/2 -translate-x-1/2 z-[100]",
            "p-1",
            "bg-body",
            "rounded-[8px] shadow-sm",
            "border-[#f5f9ef] border",
            "mx-auto font-[500] text-[16px]",
            "hover:border-[#f5f9ef] hover:shadow-md",
            "duration-500",
            "flex flex-col gap-1",
            "items-stretch",
          )}
        >
          {options.map((option) => (
            <ButtonText
              className="w-full"
              key={option}
              size="small"
              isActive={option === value}
              onClick={() => {
                updateNode(nodeId, getObjectFromPath(dataPath, option));
                setIsOpen(false);
              }}
            >
              <span>{option}</span>
            </ButtonText>
          ))}
        </div>
      )}
    </div>
  );
}

// memo() drops generics, cast keeps the inference at call sites
export const FlowSelect = memo(
  FlowSelectComponent,
) as typeof FlowSelectComponent;
