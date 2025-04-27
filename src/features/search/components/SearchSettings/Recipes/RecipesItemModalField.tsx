import { useTranslation } from "react-i18next";

import Input from "@/components/UI/Input";

type Props = {
  label: string;
  children?: React.ReactNode;
  value?: string;
  isDisabled?: boolean;
};

const RecipesItemModalField = ({ label, children, value, isDisabled }: Props) => {
  const { t } = useTranslation();

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
    </>
  );
};

export default RecipesItemModalField;
