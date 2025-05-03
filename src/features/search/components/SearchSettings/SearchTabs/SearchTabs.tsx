import { useState } from "react";
import clsx from "clsx";

import ButtonIcon from "@/components/UI/ButtonIcon";
import ButtonText from "@/components/UI/ButtonText";

import IconSearchSettings from "@/components/Icons/IconSearchSettings";
import IconSearchInput from "@/components/Icons/IconSearchInput";
import IconSearchWeb from "@/components/Icons/IconSearchWeb";
import IconSearchResults from "@/components/Icons/IconSearchResults";

import Recipes from "../Recipes/Recipes";

const getClassNameForTab = (tab: string, activeTab: string) =>
  clsx("col-start-1 row-start-1", "duration-500", {
    "opacity-100": activeTab === tab,
    "opacity-0 pointer-events-none": activeTab !== tab,
  });

const SearchTabs = () => {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <div>
      <header className="flex gap-2 pb-1 mb-2 border-b-[1px] border-b-[#51860144]">
        <ButtonText
          onClick={() => setActiveTab("general")}
          isActive={activeTab === "general"}
        >
          <IconSearchSettings />
          <span>General</span>
        </ButtonText>
        <ButtonText
          onClick={() => setActiveTab("input")}
          isActive={activeTab === "input"}
        >
          <IconSearchInput />
          <span>1. Input</span>
        </ButtonText>
        <ButtonText
          onClick={() => setActiveTab("web")}
          isActive={activeTab === "web"}
        >
          <IconSearchWeb />
          <span>2. Web</span>
        </ButtonText>
        <ButtonText
          onClick={() => setActiveTab("results")}
          isActive={activeTab === "results"}
        >
          <IconSearchResults />
          <span>3. Results</span>
        </ButtonText>
      </header>
      <div className="grid">
        <div className={getClassNameForTab("general", activeTab)}>General</div>
        <div className={getClassNameForTab("input", activeTab)}>Input</div>
        <div className={getClassNameForTab("web", activeTab)}>
          <Recipes />
        </div>
        <div className={getClassNameForTab("results", activeTab)}>results</div>
      </div>
    </div>
  );
};

export default SearchTabs;
