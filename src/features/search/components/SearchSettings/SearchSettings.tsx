import { useTranslation } from "react-i18next";
import clsx from "clsx";

import { recipes } from "@/constants";

import ButtonText from "@/components/UI/ButtonText";

import IconGithub from "@/components/Icons/IconGithub";

import useAppStore from "@/stores/appStore";

import Language from "./Language/Language";

const SearchSettings = () => {
  const areSettingsOpen = useAppStore((state) => state.areSettingsOpen);
  const { t } = useTranslation();

  return (
    <div
      className={clsx(
        "bg-[#f5f9ef] rounded-b-md",
        "overflow-auto no-scrollbar",
        "duration-1000 ease-in-out",
        {
          "max-h-0 opacity-20": !areSettingsOpen,
          "max-h-[100svh] opacity-100": areSettingsOpen,
        }
      )}
    >
      <div className="max-w-screen-md mx-auto p-4 flex flex-col gap-5">      
        <div className="flex justify-between items-center">        
          <Language />
          <ButtonText
            href="https://github.com/Deykun/shoukai"
            target="_blank"
            rel="noreferrer noopener"
            title="Google Maps"
          >
            <IconGithub />
            <span>Page repository</span>
          </ButtonText>
        </div>
        <p className="text-justify show-for-no-script">
          {t('about.description')}
        </p>
        <ul>
          {recipes.map(({ name }) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchSettings;
