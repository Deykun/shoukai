import { useTranslation } from "react-i18next";
import IconLogoSearch from "@/components/Icons/IconLogoSearch";
import ButtonText from "@/components/UI/ButtonText";
import { cn } from "@/utils/tailwind";
import {
  getDefaultSearchEngineToOpen,
  SEARCH_ENGINE_TO_OPEN_TYPES,
  SEARCH_ENGINES_BY_TYPE,
  searchEngineToOpenSchema,
  type SearchEngineToOpen,
  type SearchEngineToOpenType,
} from "@/features/logic/nodes/type/schema";

type Props = {
  value: SearchEngineToOpen;
  onChange: (value: SearchEngineToOpen) => void;
};

const rowClassName = cn("flex flex-wrap gap-1", "items-stretch");

export const FlowSelectSearchToOpen = ({ value, onChange }: Props) => {
  const { t } = useTranslation();
  const searchEngines = SEARCH_ENGINES_BY_TYPE[value.type];

  const handleTypeSelect = (type: SearchEngineToOpenType) => {
    if (type === value.type) {
      return;
    }

    // engines differ per type, so a type switch resets engine to that type's default
    onChange(getDefaultSearchEngineToOpen(type));
  };

  const handleSearchEngineSelect = (searchEngine: string) => {
    // parse instead of cast - union guarantees engine belongs to current type
    onChange(
      searchEngineToOpenSchema.parse({ type: value.type, searchEngine }),
    );
  };

  return (
    <div className="flex flex-col gap-2">
      <div className={rowClassName}>
        {SEARCH_ENGINE_TO_OPEN_TYPES.map((type) => (
          <ButtonText
            key={type}
            isActive={type === value.type}
            onClick={() => handleTypeSelect(type)}
          >
            <span>{t(`searchToOpen.${type}`)}</span>
          </ButtonText>
        ))}
      </div>
      <div className={rowClassName}>
        {searchEngines.map((searchEngine) => (
          <ButtonText
            key={searchEngine}
            isActive={searchEngine === value.searchEngine}
            onClick={() => handleSearchEngineSelect(searchEngine)}
          >
            <IconLogoSearch engine={searchEngine} className="size-4" />
            <span>{t(`search.${searchEngine}`)}</span>
          </ButtonText>
        ))}
      </div>
    </div>
  );
};
