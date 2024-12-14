import { useTranslation } from 'react-i18next';

import { LOCAL_STORAGE } from '@/constants';

import { SUPPORTED_LANGS } from '@/i18n';

import IconFlag from '@/components/Icons/IconFlag';

import ButtonIcon from '@/components/UI/ButtonIcon';

const Language = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem(LOCAL_STORAGE.SHOUKAI_USER_LANG, lang);
  }

  return (
    <section>
      <h3 className="sr-only">Language</h3>
      <div className="flex">
        {SUPPORTED_LANGS.map((lang) => <ButtonIcon
          key={lang}
          onClick={() => changeLanguage(lang)}
          className="rounded-sm"
          isActive={i18n.language === lang}
          label={t('main.currentLanguage', { lng: lang })}
          labelPosition="bottom"
        >
          <IconFlag className="navigation-pane-flag" code={lang} />
        </ButtonIcon>)}
      </div>
    </section>
  )
}

export default Language;
