import { Handle, HandleProps } from "@xyflow/react";

type Props = {
  x?: boolean;
} & HandleProps;

export const NodeHandle = (props: Props) => {
  return (
    <Handle
      style={{
        width: 10,
        height: 10,
        backgroundColor: "#005b46",
        borderColor: "#005b46",
        top: 25,
      }}
      {...props}
    />
  );
};
