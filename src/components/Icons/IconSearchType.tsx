import IconSearchChatbot from "./IconSearchChatbot";
import IconSearchImage from "./IconSearchImage";
import IconSearchMap from "./IconSearchMap";
import IconSearchWeb from "./IconSearchWeb";

type Props = {
  type: string;
  className?: string;
};

const ICON_BY_TYPE: Partial<
  Record<string, ({ className }: { className?: string }) => JSX.Element>
> = {
  "search-text": IconSearchWeb,
  "search-image": IconSearchImage,
  "search-location": IconSearchMap,
  "ask-chatbot": IconSearchChatbot,
};

const Icon = ({ type, className }: Props) => {
  const Icon = ICON_BY_TYPE[type] ?? IconSearchWeb;

  return <Icon className={className} />;
};

export default Icon;
