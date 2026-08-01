import z from "zod";
import { nodeSchemaByNodeType } from "../type/nodeTypes";
import { ShoukaiNodeDataByType, ShoukaiNodeType } from "../type/types";

type GetIsNodeDataValidResult<T extends ShoukaiNodeType> =
  | { success: true; data: Partial<ShoukaiNodeDataByType[T]> }
  | { success: false };

export const getIsNodeDataValid = <T extends ShoukaiNodeType>(
  // `string & {}` keeps literal inference for T while still accepting plain strings
  type: T | (string & {}) | undefined,
  data: unknown,
  { isPartial = false }: { isPartial?: boolean } = {},
): GetIsNodeDataValidResult<T> => {
  const schema = nodeSchemaByNodeType[type as ShoukaiNodeType];

  if (!schema) {
    return { success: false };
  }

  const result = isPartial ? schema.partial().safeParse(data) : schema.safeParse(data);

  if (!result.success) {
    return { success: false };
  }

  return { success: true, data: result.data as Partial<ShoukaiNodeDataByType[T]> };
};
