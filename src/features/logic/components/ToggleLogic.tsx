import useAppStore, {
  toggleLogicModal,
  toggleSettingsPane,
} from "@/stores/appStore";

import IconFlow from "@/components/Icons/IconFlow";

import ButtonText from "@/components/UI/ButtonText";

const ToggleLogic = () => {
  const isOpen = useAppStore((state) => state.modal.type === "logic");

  const handleClick = () => {
    toggleLogicModal();

    if (!isOpen) {
      toggleSettingsPane();
    }
  };

  return (
    <ButtonText onClick={handleClick} isActive={isOpen}>
      <IconFlow />
      <span>Search logic</span>
    </ButtonText>
  );
};

export default ToggleLogic;
