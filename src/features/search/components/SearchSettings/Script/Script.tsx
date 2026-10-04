import ButtonText from "@/components/UI/ButtonText";
import IconDownload from "@/components/Icons/IconDownload";
import Checkbox from "@/components/UI/Checkbox";
import useSearchSettingsStore, {
  toggleShouldOpenNewTabForResult,
} from "@/features/search/stores/searchSettingsStore";

declare global {
  interface Window {
    shoukaiScript?: {
      version?: string;
    };
  }
}

const Script = () => {
  const shouldOpenNewTabForResults = useSearchSettingsStore(
    (state) => state.shouldOpenNewTabForResults,
  );

  return (
    <>
      <div className="flex gap-3 items-center">
        <ButtonText
          href="https://deykun.github.io/shoukai/user-script/shoukai.user.js"
          target="_blank"
          isActive
        >
          <IconDownload />
          <span className="show-for-script">Update</span>
          <span className="show-for-no-script">Download</span>
        </ButtonText>
        <p className="text-xs font-[600] text-[#979f8a]">
          <span>Script version: </span>
          <strong id="shoukai-version" className="text-[#005b46]">
            {window?.shoukaiScript?.version ? (
              window.shoukaiScript.version
            ) : (
              <span className="text-[#d50101]">not connected</span>
            )}
          </strong>
        </p>
      </div>
      <div className="mt-8 flex gap-3 items-center">
        <Checkbox
          isActive={shouldOpenNewTabForResults}
          onChange={toggleShouldOpenNewTabForResult}
        />
        <label
          className="text-sm font-[600] cursor-pointer"
          onClick={toggleShouldOpenNewTabForResult}
        >
          <span className="text-[#005b46]">Open results in a new tab</span>
          <small className="text-[#979f8a]">
            <br />
            shoukai will remain as the active tab, but make sure you’ve allowed
            shoukai to open new tabs
          </small>
        </label>
      </div>
    </>
  );
};

export default Script;
