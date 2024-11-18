import clsx from 'clsx';

import IconEn from './Flags/En';
import IconPl from './Flags/Pl';

import './IconFlag.scss';

const iconByCode = {
  en: IconEn,
  pl: IconPl,
};

const supportedCodes = Object.keys(iconByCode);

type Props = {
  className?: string,
  code: string,
};

const Icon = ({ className, code }: Props) => {
  const IconForCode = supportedCodes.includes(code) ? iconByCode[code as keyof typeof iconByCode] : null;

  if (!IconForCode) {
    return null;
  }

  return <IconForCode className={clsx('icon-flag', {
      [className || '']: className,
    },
  )} />
}

export default Icon;
