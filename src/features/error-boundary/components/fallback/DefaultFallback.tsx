import { resetDiagramStore } from "@/features/logic/stores/useDiagramStore";
import { useEffect } from "react";

export const DefaultFallback = () => {
  useEffect(() => {
    const hasFallback = sessionStorage.getItem("fallback") === "fallback";
    if (!hasFallback) {
      return;
    }

    sessionStorage.setItem("fallback", "fallback");
    resetDiagramStore();
    window.location.reload();
  }, []);

  return <div>Error.</div>;
};
