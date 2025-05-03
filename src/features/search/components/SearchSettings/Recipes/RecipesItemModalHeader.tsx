import { useTranslation } from "react-i18next";

type Props = {
  icon?: React.ElementType;
  title: string;
  description?: string;
};

const RecipesItemModalHeader = ({ icon: Icon, title, description }: Props) => {
  const { t } = useTranslation();

  return (
    <div className="[&:not(:first-child)]:mt-8 mb-3 col-span-4 flex flex-col gap-1">
      <h2 className="flex gap-2 items-center">
        {Icon && <Icon className="size-7 text-[#82a849]" />}
        <span>{t(title)}</span>
      </h2>
      {description && <p className="mt-1">{t(description)}</p>}
    </div>
  );
};

export default RecipesItemModalHeader;
