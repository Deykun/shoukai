import useSearchSettingsStore, {
  toggleShouldOpenNewTabForResult,
} from "@/features/search/stores/searchSettingsStore";

import Checkbox from "@/components/UI/Checkbox";

const General = () => {
  const shouldOpenNewTabForResults = useSearchSettingsStore(
    (state) => state.shouldOpenNewTabForResults
  );

  return (
    <div>
      <div className="flex gap-3 items-center">
        <Checkbox
          isActive={shouldOpenNewTabForResults}
          onChange={toggleShouldOpenNewTabForResult}
        />
        <label
          className="text-sm font-[600] cursor-pointer"
          onClick={toggleShouldOpenNewTabForResult}
        >
          <span className="text-[#005b46]">Open results in new tabs</span>
          <small className="text-[#979f8a]">
            <br />
            shoukai will remain as the active tab, but make sure you’ve allowed
            shoukai to open tabs
          </small>
        </label>
      </div>
    </div>
  );
};

export default General;
