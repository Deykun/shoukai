import { HandleStatus } from "@/features/logic-runner/stores/useRunnerContextStore";
import { useLastHandleData } from "../../hooks/useLastHandleData";
import { cn } from "@/utils/tailwind";
import IconCheck from "@/components/Icons/IconCheck";
import IconClose from "@/components/Icons/IconClose";

type Props = {
  nodeId: string;
  handleId: string;
  className?: string;
};

const ICON_BY_STATUS: Record<
  HandleStatus,
  ({ className }: { className?: string }) => JSX.Element
> = {
  active: IconCheck,
  rejected: IconClose,
};

export const NodeHandleStatus = ({ nodeId, handleId, className }: Props) => {
  const handleData = useLastHandleData(nodeId, handleId);

  if (!handleData) {
    return null;
  }

  const Icon = ICON_BY_STATUS[handleData.status];

  return (
    <button
      data-status={handleData.status}
      title={handleData.comment}
      className={cn(
        "inline-flex items-center justify-center",
        "size-3.5 rounded-full",
        "text-white",
        "scale-100 starting:scale-0",
        "transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
        handleData.status === "active" && "bg-[#67ab00]",
        handleData.status === "rejected" && "bg-[#ab1800]",
        className,
      )}
    >
      <Icon className="size-2" />
    </button>
  );
};
