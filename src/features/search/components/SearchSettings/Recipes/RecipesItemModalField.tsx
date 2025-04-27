import { useTranslation } from "react-i18next";

import Input from "@/components/UI/Input";

type Props = {
  label: string;
  labelDescription?: string;
  children?: React.ReactNode;
  value?: string;
  valueDescription?: string;
  isDisabled?: boolean;
};

const RecipesItemModalField = ({
  label,
  labelDescription = "",
  children,
  value,
  valueDescription = "",
  isDisabled,
}: Props) => {
  const { t } = useTranslation();

  const hasDescription = Boolean(labelDescription || valueDescription);

  return (
    <>
      <h3 className="text-right">{t(label)}</h3>
      {children ? (
        <div className="col-span-3">{children}</div>
      ) : (
        <Input
          className="col-span-3"
          defaultValue={value}
          isDisabled={isDisabled}
        />
      )}
      {hasDescription && (
        <>
          <span>{labelDescription}</span>
          <p className="col-span-3 opacity-50 text-xs text-justify hyphens-auto">{valueDescription}</p>
        </>
      )}
    </>
  );
};

export default RecipesItemModalField;
