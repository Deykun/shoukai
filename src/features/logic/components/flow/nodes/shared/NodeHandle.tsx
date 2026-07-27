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
        backgroundColor: "#518601",
        borderColor: "#518601",
      }}
      {...props}
    />
  );
};
