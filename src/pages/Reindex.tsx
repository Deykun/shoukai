import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { LOCAL_STORAGE } from '@/constants';

import Logo from '@/components/Logo/Logo';

const Reindex = () => {
  const { t } = useTranslation();

  useEffect(() => {
    const timestamp = (new Date()).getTime();

    // TODO listen to localStorage update to refresh results
    localStorage.setItem(LOCAL_STORAGE.SHOUKAI_UPDATE, `ts-${timestamp}`);

    setTimeout(() => {
      window.close();
    }, 1)
  }, []);

  return (
    <main className="text-center min-h-[100lvh] flex flex-col justify-center">
      <Logo />
      <p>{t("search.updatingResults")}</p>
    </main>
  );
};

export default Reindex;
