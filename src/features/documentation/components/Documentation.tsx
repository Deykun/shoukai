import useAppStore, {
  toggleDocumentationOverviewModal,
} from "@/stores/appStore";

import IconInfo from "@/components/Icons/IconInfo";

import ButtonIcon from "@/components/UI/ButtonIcon";

const Documentation = () => {
  const isOpen = useAppStore(
    (state) => state.modal.type === "documentationOverview"
  );

  return (
    <div className="flex gap-1">
      <h3 className="sr-only">Documentation</h3>
      <ButtonIcon
        onClick={toggleDocumentationOverviewModal}
        isActive={isOpen}
        label="Documentation"
        labelPosition="bottom"
      >
        <IconInfo />
      </ButtonIcon>
    </div>
  );
};

export default Documentation;
