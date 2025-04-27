import IconBing from "@/components/Icons/IconBing";
import IconDuckDuckGo from "@/components/Icons/IconDuckDuckGo";
import IconGoogle from "@/components/Icons/IconGoogle";
import IconYandex from "@/components/Icons/IconYandex";

type Props = {
  id: string;
  className?: string;
};

const Icon = ({ id, className }: Props) => {
  if (id === "bing") {
    return <IconBing className={className} />;
  }

  if (id === "duckduckgo") {
    return <IconDuckDuckGo className={className} />;
  }

  if (id === "google") {
    return <IconGoogle className={className} />;
  }

  if (id === "yandex") {
    return <IconYandex className={className} />;
  }

  return null;
};

export default Icon;
