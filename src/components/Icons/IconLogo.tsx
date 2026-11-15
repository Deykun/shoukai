import IconOSM from "./IconOSM";
import IconApple from "./IconApple";
import IconBing from "./IconBing";
import IconDuckDuckGo from "./IconDuckDuckGo";
import IconGoogle from "./IconGoogle";
import IconYandex from "./IconYandex";
import IconSearchResults from "./IconSearchResults";
import IconChatGPT from "./IconChatGPT";
import IconClaude from "./IconClaude";

type Props = {
  id: string;
  className?: string;
};

const ICON_BY_ID: Partial<
  Record<string, ({ className }: { className?: string }) => JSX.Element>
> = {
  bing: IconBing,
  duckduckgo: IconDuckDuckGo,
  google: IconGoogle,
  yandex: IconYandex,
  openstreetmap: IconOSM,
  apple: IconApple,
  chatgpt: IconChatGPT,
  claude: IconClaude,
};

const Icon = ({ id, className }: Props) => {
  const Icon = ICON_BY_ID[id];

  if (Icon) {
    return <Icon className={className} />;
  }

  return <IconSearchResults className={className} />;
};

export default Icon;
