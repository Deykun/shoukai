import { useTranslation } from "react-i18next";
import clsx from "clsx";

import ButtonIcon from "@/components/UI/ButtonIcon";
import ButtonText from "@/components/UI/ButtonText";

import IconClose from "@/components/Icons/IconClose";
import IconGithub from "@/components/Icons/IconGithub";

import useAppStore, { toggleSettingsPane } from "@/stores/appStore";

import Language from "./Language/Language";
import SearchTabs from "./SearchTabs/SearchTabs";

import Documentation from "@/features/documentation/components/Documentation";

const SearchSettings = () => {
  const areSettingsOpen = useAppStore((state) => state.topPane === "settings");
  const { t } = useTranslation();

  return (
    <div
      className={clsx(
        "bg-[#f5f9ef] rounded-b-md",
        "overflow-auto no-scrollbar",
        "duration-1000 ease-in-out",
        {
          "max-h-0": !areSettingsOpen,
          "max-h-[100svh]": areSettingsOpen,
        }
      )}
    >
      <div
        className={clsx(
          "max-w-screen-md mx-auto p-4 flex flex-col gap-5",
          "duration-1000 ease-in-out",
          {
            "opacity-20": !areSettingsOpen,
            "opacity-100": areSettingsOpen,
          }
        )}
      >
        <div className="flex gap-2 items-center">
          <Language />
          <Documentation />
          <ButtonText
            href="https://github.com/Deykun/shoukai"
            target="_blank"
            rel="noreferrer noopener"
            title="github.com/Deykun/shoukai"
            wrapperClassName="ml-auto"
          >
            <IconGithub />
            <span>Page repository</span>
          </ButtonText>
          <ButtonIcon
            label={t("main.close")}
            labelPosition="bottom"
            onClick={toggleSettingsPane}
          >
            <IconClose />
          </ButtonIcon>
        </div>
        <p className="text-justify show-for-no-script">
          {t("about.description")}
          <br />
          <a
            href="https://deykun.github.io/shoukai/user-script/shoukai.user.js"
            target="_blank"
            className="underline"
          >
            shoukai/user-script/shoukai.user.js
          </a>
        </p>
        <SearchTabs />
      </div>
    </div>
  );
};

export default SearchSettings;
