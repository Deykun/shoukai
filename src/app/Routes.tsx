import { Route, Switch, useLocation } from "wouter";
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

import { PATHS_DATA } from '../constants';

import Home from '@/pages/Home';
import Reindex from '@/pages/Reindex';

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
    const pathToCompare = path.replace('/shoukai/', '');
    const pathData = PATHS_DATA.find(({ path: itemPath }) => pathToCompare === itemPath);
    
    if (pathData) {
      return pathData.title;
    }

    return 'shoukai - personalized search';
  }, [path]);

  return (
    <>
      <Helmet>
          <title>{title}</title>
      </Helmet>
      <Switch >
        <Route path="/shoukai" component={Home} />
        <Route path="/shoukai/reindex" component={Reindex} />
      </Switch>
    </>
  )
}

export default Routes
