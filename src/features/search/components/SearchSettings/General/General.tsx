import useAppStore, { toggleDefaultSearchEngineModal } from "@/stores/appStore";
import ButtonText from "@/components/UI/ButtonText";

const General = () => {
  const isModalOpen = useAppStore(
    (state) => state.modal.type === "default-search-engines",
  );

  return (
    <div className="flex flex-col gap-8">
      <p className="text-sm font-[600] text-[#979f8a]">
        Hi! Keep in mind that this is an alpha version.
      </p>
      <ButtonText
        onClick={toggleDefaultSearchEngineModal}
        isActive={isModalOpen}
        size="small"
      >
        <span>Change default search engines</span>
      </ButtonText>
    </div>
  );
};

export default General;
