import { ReactFlowProvider } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import FlowLogic from "./FlowLogic";

export default function FlowLogicWrapper() {
  return (
    <ReactFlowProvider>
      <FlowLogic />
    </ReactFlowProvider>
  );
}
