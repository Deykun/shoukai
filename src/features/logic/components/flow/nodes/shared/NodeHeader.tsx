import IconArrowForward from "@/components/Icons/IconArrowForward";

import IconBookWithBookmark from "@/components/Icons/IconBookWithBookmark";
import IconSearchInput from "@/components/Icons/IconSearchInput";
import { ShoukaiNodeType } from "@/features/logic/types";
import { cn } from "@/utils/tailwind";
import NodeIcon from "./NodeIcon";

type Props = {
  type: ShoukaiNodeType | (string & {});
  label: string;
  description: string;
};

const NodeHeader = ({ type, label, description }: Props) => {
  return (
    <header className="flex gap-3">
      <NodeIcon type={type} />
      <div className="w-full">
        <h2 className="text-primary-contrast font-[600] text-sm leading-4 mb-1 mt-1">{label}</h2>
        <p className="text-xs text-[#42424280]">{description}</p>
      </div>
    </header>
  );
};

export default NodeHeader;
