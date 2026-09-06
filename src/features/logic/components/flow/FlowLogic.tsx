import {
  ReactFlow,
  Background,
  BackgroundVariant,
  ConnectionLineType,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { cn } from "@/utils/tailwind";
import useDiagramStore, {
  onConnect,
  onEdgesChange,
  onNodesChange,
} from "../../stores/useDiagramStore";
import { useOnDragEvents } from "../../hooks/useOnDragEvents";
import { nodeTypes } from "../../nodes/type/nodeTypes";
import SidebarFlow from "../sidebar/SidebarFlow";

export default function FlowLogic() {
  const edges = useDiagramStore((store) => store.edges);
  const nodes = useDiagramStore((store) => store.nodes);

  const { onDragOver, onDrop } = useOnDragEvents();

  return (
    <div className={cn("w-full h-[100dvh] bg-white")}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        connectionLineType={ConnectionLineType.SmoothStep}
        fitView
        // maxZoom={0.5}
        maxZoom={3}
      >
        <Background color="#f5f9ef" variant={BackgroundVariant.Dots} size={4} />
      </ReactFlow>
      <SidebarFlow />
    </div>
  );
}
