import { cn } from "@/utils/tailwind";
import Palette from "./palette/Palette";
import ButtonRefreshLayout from "../../functions/layout/components/ButtonRefreshLayout";

export default function SidebarFlow() {
  return (
    <div
      className={cn(
        "fixed top-4 left-0 z-10",
        "bg-[#f5f9ef] rounded-r-xl",
        "p-4",
        "translate-x-0 starting:-translate-x-full",
        "transition-transform duration-500 delay-500 ease-in-out",
        "flex flex-col gap-2 justify-center items-center",
      )}
    >
      <Palette />
      <ButtonRefreshLayout />
    </div>
  );
}
