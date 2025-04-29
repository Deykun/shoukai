import { useTranslation } from "react-i18next";

type Props = {
  title: string;
  description?: string;
};

const RecipesItemModalHeader = ({ title, description }: Props) => {
  const { t } = useTranslation();

  return (
    <div className="[&:not(:first-child)]:mt-8 mb-3 col-span-4 flex flex-col gap-1">
      <h2 className="font-[600]">{t(title)}</h2>
      {description && (
        <p className="opacity-50 text-sm text-justify hyphens-auto">
          {t(description)}
        </p>
      )}
    </div>
  );
};

export default RecipesItemModalHeader;
