import { useTranslation } from "react-i18next";

import useAppStore, { closeModal } from "@/stores/appStore";

import IconClose from "@/components/Icons/IconClose";
import IconGithub from "@/components/Icons/IconGithub";
import IconSearchInput from "@/components/Icons/IconSearchInput";
import IconSearchWeb from "@/components/Icons/IconSearchWeb";
import IconSearchResults from "@/components/Icons/IconSearchResults";

import ButtonIcon from "@/components/UI/ButtonIcon";
import ButtonText from "@/components/UI/ButtonText";
import Logo from "@/components/Logo/Logo";

const OverviewModal = () => {
  const isOpen = useAppStore(
    (state) => state.modal.type === "documentationOverview"
  );

  const { t, i18n } = useTranslation();

  if (!isOpen) {
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
      <div className="grid grid-cols-2 gap-4">
        <Logo />
        <div className="flex flex-col gap-5 external-content">
          <p>
            Shoukai is <strong>a proof of concept</strong> for an alternative
            approach to search. There are only a handful of true search engines
            on the market (with their own crawlers), and competing with them is
            a challenge. Each one has its own issues (and trust me, I've tested
            them all).
          </p>
          <p>
            I created <strong>shoukai</strong> because I think there is room for
            improvement that could outperform what's currently available on the
            market.
          </p>
        </div>
      </div>
      <div className="mt-10 flex flex-col gap-5 external-content">
        <div>
          <p>How does shoukai work?</p>
          <h1>Three steps of searching</h1>
        </div>
        <h2 className="flex gap-3 items-center">
          <IconSearchInput className="size-10 text-[#82a849]" />
          <span>1. Input analysis and intent detection</span>
        </h2>
        <p>
          After you make a request, the text of the prompt is validated to
          determine <strong>tags</strong>. For example, if the phrase is written
          in <var>camelCase</var> or contains characters like <var>()</var> or{" "}
          <var>[]</var>, it's probably developer-related. A number like{" "}
          <var>1987</var> or <var>2013</var> might suggest that we're looking
          for a movie, and a single <var>-</var> in the middle could indicate an
          artist and a song title.
        </p>
        <p>
          This is a basic tag detection method that we use to decide whether to
          skip some of the <strong>recipes</strong>.
        </p>
        <p>
          <strong>In the future</strong>, if possible, some kind of LLM might be
          used to match prompts to tags directly on the device. For example,
          Chrome is working on{" "}
          <a
            href="https://developer.chrome.com/docs/ai/language-detection"
            target="_blank"
          >
            a languageDetectorApi
          </a>{" "}
          - a useful tool for determining the language.
        </p>
        <p>
          Some of the prompts can trigger a <strong>shortcut</strong>. For
          example, including
          <var>img</var> or <var>logo</var> at the beginning or end of the
          prompt may result in an image search opening directly, similar to how{" "}
          <var>map</var> opens maps.
        </p>
        <br />
        <h2 className="flex gap-3 items-center">
          <IconSearchWeb className="size-10 text-[#82a849]" />
          <span>2. Searching the web</span>
        </h2>
        <p>
          After <strong>tags</strong> are assigned to the prompt, the list of
          user <strong>recipes</strong> is checked, and <strong>shoukai</strong>{" "}
          is used to determine whether a recipe - an instruction to open an
          external search engine to gather results for the phrase - should be
          run.
        </p>
        <p>
          At this stage, <strong>multiple tabs</strong> can be open
          simultaneously and are closed when the search engines render the
          results. An installed <strong>user script</strong> is responsible for
          gathering the data and closing the tab.
        </p>
        <br />
        <h2 className="flex gap-3 items-center">
          <IconSearchResults className="size-10 text-[#82a849]" />
          <span>3. Result evaluation</span>
        </h2>
        <p>
          After the search engine tabs are closed, the data on the shoukai page
          is parsed and evaluated by <strong>recipes</strong> to determine their
          score.
        </p>
        <br />
        <div>
          <p>What are the benefits?</p>
          <h1>Advantages of shoukai over other solutions</h1>
        </div>
        <p>
          I developed this solution to improve{" "}
          <strong>my searching experience</strong>. At the moment, I haven’t yet
          reached a point where I’m satisfied with the results, but there are
          still multiple loose ends to tie up. I believe I can eventually do
          better than any others. I released the project at this stage to use it
          myself and to address the problems I encounter while using it.
        </p>
        <br />
        <ButtonText
          href="https://github.com/Deykun/shoukai"
          target="_blank"
          rel="noreferrer noopener"
          title="github.com/Deykun/shoukai"
          isActive
        >
          <IconGithub />
          <span>Page repository</span>
        </ButtonText>
      </div>
    </article>
  );
};

export default OverviewModal;
