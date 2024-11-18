import { Route, Switch, useLocation } from "wouter";
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

import { PATHS_DATA } from '../constants';

import Home from '@/pages/Home';

import { useEffect, useMemo } from "react";

const Routes = () => {
  const [path] = useLocation();
  const { i18n } = useTranslation();

  useEffect(() => {
    if (i18n.language !== document.documentElement?.lang) {
      document.documentElement.lang = i18n.language;
    }
  }, [i18n.language]);

  const title = useMemo(() => {
    const pathToCompare = path.replace('/spes/', '');
    const pathData = PATHS_DATA.find(({ path: itemPath }) => pathToCompare === itemPath);
    
    if (pathData) {
      return pathData.title;
    }

    return 'Spes - personalized search';
  }, [path]);

  return (
    <>
      <Helmet>
          <title>{title}</title>
      </Helmet>
      <Switch >
        <Route path="/spes" component={Home} />
      </Switch>
    </>
  )
}

export default Routes
