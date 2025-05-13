import ButtonText from "@/components/UI/ButtonText";
import IconDownload from "@/components/Icons/IconDownload";

declare global {
  interface Window {
    shoukaiScript?: {
      version?: string;
    };
  }
}

const Script = () => {
  return (
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
        <strong id="" shoukai-version className="text-[#005b46]">
          {window?.shoukaiScript?.version ? (
            window.shoukaiScript.version
          ) : (
            <span className="text-[#d50101]">not connected</span>
          )}
        </strong>
      </p>
    </div>
  );
};

export default Script;
