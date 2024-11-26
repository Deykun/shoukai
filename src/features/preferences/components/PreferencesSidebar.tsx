import { useTranslation } from 'react-i18next';

import { LOCAL_STORAGE } from '@/constants';

import { SUPPORTED_LANGS } from '@/i18n';

import IconFlag from '@/components/Icons/IconFlag';
import IconGithub from '@/components/Icons/IconGithub';

import Panel from '@/components/UI/Panel';
import ButtonIcon from '@/components/UI/ButtonIcon';

const PreferencesSidebar = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem(LOCAL_STORAGE.SHOUKAI_USER_LANG, lang);
  }

  return (
    <section className="fixed top-2 right-0">
      <Panel className="bg-[#f5f9ef] p-4 rounded-l-md">
        {SUPPORTED_LANGS.map((lang) => <ButtonIcon
          key={lang}
          onClick={() => changeLanguage(lang)}
          className="rounded-sm"
          isActive={i18n.language === lang}
          label={t('main.currentLanguage', { lng: lang })}
          labelPosition="left"
        >
          <IconFlag className="navigation-pane-flag" code={lang} />
          {/* {i18n.language === lang && <span className="ui-button-icon-marker ui-button-icon-marker--on-soft"><IconCheck className="h-[10px]" /></span>} */}
        </ButtonIcon>)}
        <span className="border-t" />
        <ButtonIcon
          className="hover:!bg-black"
          href="https://github.com/Deykun/shoukai"
          target="_blank"
          label="Page repository"
          labelPosition="left"
        >
          <IconGithub />
        </ButtonIcon>
      </Panel>
    </section>
  )
}

export default PreferencesSidebar;
