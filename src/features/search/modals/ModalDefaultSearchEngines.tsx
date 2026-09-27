import IconClose from "@/components/Icons/IconClose";
import IconLogoSearch from "@/components/Icons/IconLogoSearch";
import ButtonIcon from "@/components/UI/ButtonIcon";
import ButtonText from "@/components/UI/ButtonText";
import Field from "@/components/UI/Field";
import useAppStore, { closeModal } from "@/stores/appStore";
import { shoukaiChatbotSchema } from "@/types/supported/chatbots";
import { shoukaiSearchEngineImageSchema } from "@/types/supported/image-engines";
import { shoukaiSearchEngineMapSchema } from "@/types/supported/map-engines";
import {
  shoukaiSearchEngineTextParsersSchema,
  shoukaiSearchEngineTextSchema,
} from "@/types/supported/text-engines";
import { useTranslation } from "react-i18next";
import useSearchSettingsStore, {
  setDefaultSearch,
} from "../stores/searchSettingsStore";

const ModalDefaultSearchEngines = () => {
  const modal = useAppStore((state) => state.modal);
  const defaultEngines = useSearchSettingsStore(
    (store) => store.defaultEngines,
  );

  const { t } = useTranslation();

  if (modal.type !== "default-search-engines") {
    return null;
  }

  return (
    <article className="max-w-screen-md mx-auto p-4 flex flex-col gap-5 animate-fade-in">
      <header className="flex gap-5 items-center">
        <ButtonIcon
          wrapperClassName="ml-auto"
          label={t("main.close")}
          labelPosition="bottom"
          onClick={closeModal}
        >
          <IconClose />
        </ButtonIcon>
      </header>
      <Field.Wrapper>
        <Field.SectionHeader title="Default search engines">
          The search engines selected here will be used as defaults when you
          click the generic <strong>Map</strong> or <strong>Image</strong>{" "}
          filter on the search results page, or when you add a new shortcut. You
          can manually change them in the selected shortcut.
        </Field.SectionHeader>
        <Field
          label="Text"
          valueDescription="Default text search engine (shoukai can open them)."
        >
          {shoukaiSearchEngineTextSchema.options.map((value) => {
            return value === "defaultSearch" ? null : (
              <ButtonText
                key={value}
                onClick={() => setDefaultSearch("text", value)}
                isActive={value === defaultEngines.text}
              >
                <IconLogoSearch engine={value as string} />
                <span>{t(`search.${value}`)}</span>
              </ButtonText>
            );
          })}
        </Field>
        <Field
          label="Text"
          valueDescription="Default text search engine (shoukai can parse results from them)."
        >
          {shoukaiSearchEngineTextParsersSchema.options.map((value) => {
            return value === "defaultSearch" ? null : (
              <ButtonText
                key={value}
                onClick={() => setDefaultSearch("textParser", value)}
                isActive={value === defaultEngines.textParser}
              >
                <IconLogoSearch engine={value as string} />
                <span>{t(`search.${value}`)}</span>
              </ButtonText>
            );
          })}
        </Field>
        <Field
          label="Image"
          valueDescription="Default image search engine (e.g., Google Images)"
        >
          {shoukaiSearchEngineImageSchema.options.map((value) => {
            return value === "defaultSearch" ? null : (
              <ButtonText
                key={value}
                onClick={() => setDefaultSearch("image", value)}
                isActive={value === defaultEngines.image}
              >
                <IconLogoSearch engine={value as string} />
                <span>{t(`search.${value}`)}</span>
              </ButtonText>
            );
          })}
        </Field>
        <Field
          label="Map"
          valueDescription="Default map search engine (e.g., Google Maps)"
        >
          {shoukaiSearchEngineMapSchema.options.map((value) => {
            return value === "defaultSearch" ? null : (
              <ButtonText
                key={value}
                onClick={() => setDefaultSearch("map", value)}
                isActive={value === defaultEngines.map}
              >
                <IconLogoSearch engine={value as string} />
                <span>{t(`search.${value}`)}</span>
              </ButtonText>
            );
          })}
        </Field>
        <Field
          label="Chat"
          valueDescription="You can create shortcuts that open a chatbot with a predefined prompt, for example, 'Translate to English: {{phrase}}'."
        >
          {shoukaiChatbotSchema.options.map((value) => {
            return value === "defaultSearch" ? null : (
              <ButtonText
                key={value}
                onClick={() => setDefaultSearch("chatbot", value)}
                isActive={value === defaultEngines.chatbot}
              >
                <IconLogoSearch engine={value as string} />
                <span>{t(`search.${value}`)}</span>
              </ButtonText>
            );
          })}
        </Field>
        <Field.SectionHeader title="Disclaimer">
          <p className="!text-xs">
            All logos and trademarks displayed on this page are the property of
            their respective owners and are used solely to identify the brands
            and products that this website links to.{" "}
            <strong>
              This page is not affiliated with, endorsed by, or sponsored by any
              of the brands or companies represented
            </strong>
            .
          </p>
          <br />
          <p className="!text-xs">
            This page is provided solely for <strong>non-commercial</strong>{" "}
            purposes. The author does not track, collect, or otherwise monitor
            users’ activity or interactions with the page.
          </p>
        </Field.SectionHeader>
      </Field.Wrapper>
    </article>
  );
};

export default ModalDefaultSearchEngines;
