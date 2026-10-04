import { useTranslation } from "react-i18next";
import IconLogo from "@/components/Icons/IconLogo";
import IconSearchType from "@/components/Icons/IconSearchType";
import ButtonIcon from "@/components/UI/ButtonIcon";
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

const rowClassName = cn("flex flex-wrap gap-2", "items-center");

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
    <div className="flex gap-2 justify-between flex-wrap">
      <div>
        <p className="text-xs text-primary-contrast mb-1">Type</p>
        <div className={rowClassName}>
          {SEARCH_ENGINE_TO_OPEN_TYPES.map((type) => (
            <ButtonIcon
              key={type}
              size="large"
              label={t(`searchToOpen.${type}`)}
              labelPosition="top"
              isActive={type === value.type}
              onClick={() => handleTypeSelect(type)}
            >
              <IconSearchType type={type} />
            </ButtonIcon>
          ))}
        </div>
      </div>
      <div>
        <p className="text-xs text-primary-contrast mb-1">Search engine</p>
        <div className={rowClassName}>
          {searchEngines.map((searchEngine) => (
            <ButtonIcon
              key={searchEngine}
              size="large"
              label={t(`search.${searchEngine}`)}
              labelPosition="top"
              isActive={searchEngine === value.searchEngine}
              onClick={() => handleSearchEngineSelect(searchEngine)}
            >
              {/* falls back to results icon for defaultSearch, same as SearchEnginePicker */}
              <IconLogo id={searchEngine} />
            </ButtonIcon>
          ))}
        </div>
      </div>
    </div>
  );
};
