import useAppStore from "@/stores/appStore";
import React from "react";
import { Suspense } from "react";

const ModalLogic = React.lazy(() =>
  import("./ModalLogic").then((module) => ({ default: module.default })),
);

const ModalLogicLazy = () => {
  const isOpen = useAppStore((state) => state.modal.type === "logic");

  if (!isOpen) {
    return null;
  }

  return (
    <Suspense>
      <ModalLogic />
    </Suspense>
  );
};

export default ModalLogicLazy;
