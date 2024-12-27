import { useTranslation } from "react-i18next";
import clsx from "clsx";

import { userRecipes } from "@/constants";

import ButtonIcon from "@/components/UI/ButtonIcon";
import ButtonText from "@/components/UI/ButtonText";

import IconClose from "@/components/Icons/IconClose";
import IconGithub from "@/components/Icons/IconGithub";

import useAppStore, { toggleSettings } from "@/stores/appStore";

import Language from "./Language/Language";

const SearchSettings = () => {
  const areSettingsOpen = useAppStore((state) => state.areSettingsOpen);
  const { t, i18n } = useTranslation();

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
        <div className="flex gap-5 items-center">
          <Language />
          <ButtonText
            href="https://github.com/Deykun/shoukai"
            target="_blank"
            rel="noreferrer noopener"
            title="Google Maps"
            wrapperClassName="ml-auto"
          >
            <IconGithub />
            <span>Page repository</span>
          </ButtonText>
          <ButtonIcon
            label={t("main.close")}
            labelPosition="bottom"
            onClick={toggleSettings}
          >
            <IconClose />
          </ButtonIcon>
        </div>
        <p className="text-justify show-for-no-script">
          {t("about.description")}
        </p>
        <ul>
          {userRecipes.map(({ name, svgIcon, byLang }) => (
            <li key={name} className="flex gap-3">
              {svgIcon && (
                <span
                  className="[&>svg]:size-4 text-[#075525] inline-flex items-center"
                  dangerouslySetInnerHTML={{ __html: svgIcon }}
                />
              )}
              <span>{byLang?.[i18n.language]?.name || name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchSettings;
