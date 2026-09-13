import { useTranslation } from "react-i18next";

import { PropsWithChildren } from "react";

const FieldWrapper = ({ children }: PropsWithChildren) => {
  return <div className="grid grid-cols-4 gap-4 items-center">{children}</div>;
};

type Props = {
  label: string;
  labelDescription?: string;
  children?: React.ReactNode;
  value?: string;
  valueDescription?: string;
  isDisabled?: boolean;
};

const Field = ({
  label,
  labelDescription = "",
  valueDescription = "",
  children,
}: PropsWithChildren<Props>) => {
  const { t } = useTranslation();

  const hasDescription = Boolean(labelDescription || valueDescription);

  return (
    <>
      <h3 className="text-right text-primary-contrast font-[600]">
        {t(label)}
      </h3>
      <div className="col-span-3">{children}</div>
      {hasDescription && (
        <>
          <span>{labelDescription}</span>
          <p className="col-span-3 text-xs text-[#979f8a]">
            {valueDescription}
          </p>
        </>
      )}
    </>
  );
};

Field.Wrapper = FieldWrapper;

export default Field;
