import useAppStore, { toggleLogicModal } from "@/stores/appStore";

import IconFlow from "@/components/Icons/IconFlow";

import ButtonText from "@/components/UI/ButtonText";

const ToggleLogic = () => {
  const isOpen = useAppStore((state) => state.modal.type === "logic");

  return (
    <ButtonText onClick={toggleLogicModal} isActive={isOpen}>
      <IconFlow />
      <span>Search logic</span>
    </ButtonText>
  );
};

export default ToggleLogic;
