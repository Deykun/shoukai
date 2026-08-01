import { useCallback } from "react";

import { setDraggedType } from "../../stores/useDragAndDropStore";
import { cn } from "@/utils/tailwind";
import { PALETTE_NODES_TYPES, ShoukaiNodeType } from "../../nodes/type/types";
import NodeIcon from "../../nodes/shared/NodeIcon";

const Palette = () => {
  const onDragStart = useCallback(
    (event: React.DragEvent<HTMLDivElement>, nodeType: ShoukaiNodeType) => {
      setDraggedType(nodeType);
      event.dataTransfer.effectAllowed = "move";
    },
    [],
  );

  return (
    <aside className="absolute left-0 top-0 z-10">
      <div
        className={cn(
          "flex flex-col gap-3 p-4",
          "bg-white w-[300px]",
          "border-r border-zinc-50 rounded-br-xl shadow-md",
        )}
      >
        <div className="p-4 text-sm text-center text-zinc-500 mb-5 tracking-wider">
          You can{" "}
          <strong className="text-zinc-800 tracking-widest">drag</strong> these
          nodes.
        </div>
        {PALETTE_NODES_TYPES.map((type) => (
          <div
            key={type}
            className={cn(
              "flex gap-3 align-middle justify-between",
              "rounded-xl py-2 px-4",
              "text-gray-500 hover:text-gray-700 font-semibold bg-white",
              "border border-zinc-50 shadow",
              "duration-500 hover:shadow-md hover:border-zinc-400",
              "cursor-pointer",
            )}
            onDragStart={(event) => onDragStart(event, type)}
            draggable
          >
            <NodeIcon type={type} className="size-6 text-black" />
            <span className="capitalize">{type} node</span>
          </div>
        ))}
        <p>Example recpies</p>
      </div>
    </aside>
  );
};

export default Palette;
