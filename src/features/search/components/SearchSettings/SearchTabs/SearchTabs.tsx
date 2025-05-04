import { useState } from "react";
import clsx from "clsx";

import ButtonText from "@/components/UI/ButtonText";

import IconBooWithBookmark from "@/components/Icons/IconBooWithBookmark";
import IconSearchSettings from "@/components/Icons/IconSearchSettings";
import IconTag from "@/components/Icons/IconTag";
import IconPaint from "@/components/Icons/IconPaint";

import General from "../General/General";
import Recipes from "../Recipes/Recipes";

type Tab = "general" | "tags" | "recipes" | "design";

const getClassNameForTab = (tab: Tab, activeTab: Tab) =>
  clsx("col-start-1 row-start-1", "duration-500", {
    "opacity-100": activeTab === tab,
    "opacity-0 pointer-events-none": activeTab !== tab,
  });

const SearchTabs = () => {
  const [activeTab, setActiveTab] = useState<Tab>("general");

  return (
    <div>
      <header className="flex gap-2 pb-1 mb-3">
        <ButtonText
          onClick={() => setActiveTab("general")}
          isActive={activeTab === "general"}
        >
          <IconSearchSettings />
          <span>General</span>
        </ButtonText>
        <ButtonText
          onClick={() => setActiveTab("design")}
          isActive={activeTab === "design"}
        >
          <IconPaint />
          <span>Design</span>
        </ButtonText>
        <ButtonText
          onClick={() => setActiveTab("tags")}
          isActive={activeTab === "tags"}
        >
          <IconTag />
          <span>Tags</span>
        </ButtonText>
        <ButtonText
          onClick={() => setActiveTab("recipes")}
          isActive={activeTab === "recipes"}
        >
          <IconBooWithBookmark />
          <span>Recipes</span>
        </ButtonText>
      </header>
      <div className="grid px-2">
        <div className={getClassNameForTab("general", activeTab)}>
          <General />
        </div>
        <div className={getClassNameForTab("tags", activeTab)}>
          <p className="text-sm font-[600] text-[#979f8a]">
            WiP: After you make a request, the text of the prompt is validated
            to determine tags.
          </p>
        </div>
        <div className={getClassNameForTab("design", activeTab)}>
          <p className="text-sm font-[600] text-[#979f8a]">WiP: Theme.</p>
        </div>
        <div className={getClassNameForTab("recipes", activeTab)}>
          <Recipes />
        </div>
      </div>
    </div>
  );
};

export default SearchTabs;
