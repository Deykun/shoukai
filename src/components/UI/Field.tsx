import { useTranslation } from "react-i18next";

import { PropsWithChildren } from "react";
import { cn } from "@/utils/tailwind";

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
    <div className="col-span-4 grid grid-cols-4 gap-4 items-center">
      <h3 className="text-right text-primary-contrast font-[600]">
        {t(label)}
      </h3>
      <div className="col-span-3">{children}</div>
      {hasDescription && (
        <>
          <span className="-mt-2 text-xs text-[#979f8a] text-right">
            {labelDescription}
          </span>
          <p className="-mt-2 col-span-3 text-xs text-[#979f8a]">
            {valueDescription}
          </p>
        </>
      )}
    </div>
  );
};

Field.Wrapper = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => {
  return <div className={cn("flex flex-col gap-6", className)}>{children}</div>;
};

Field.SectionHeader = ({
  children,
  title,
}: PropsWithChildren<{ title: string }>) => {
  return (
    <div className="my-6 first:mt-0">
      <h2 className="text-left text-primary-contrast font-[600]">{title}</h2>
      {children && <div className="external-content mt-2">{children}</div>}
    </div>
  );
};

export default Field;
