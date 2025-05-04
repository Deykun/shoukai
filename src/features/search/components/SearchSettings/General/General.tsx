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
          className="text-sm font-[500]"
          onClick={toggleShouldOpenNewTabForResult}
        >
          Open results in new tabs{" "}
          <small>
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
