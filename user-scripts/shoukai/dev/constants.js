const shoukaiUrl = 'https://deykun.github.io/shoukai/';

const getFromLocalStorage = (key, defaultValues = {}) => (localStorage.getItem(key)
  ? { ...defaultValues, ...JSON.parse(localStorage.getItem(key)) }
  : { ...defaultValues });

const getSourcesFromLS = () => getFromLocalStorage('shoukaiparse-units', {});

const getSettingsFromLS = () => getFromLocalStorage('shoukaiparse-state', {});

unsafeWindow.shoukaiScript = {
  version: 'SCRIPT_VERSION',
  isDevMode: false,
  cache: {
    HTML: {},
    CSS: {},
    inited: false,
    status: null,
    location: location.href,
  },
  settings: getSettingsFromLS(),
  actions: {},
};

unsafeWindow.shoukaiScript.ui = {
  status: {
    type: '',
    text: '',
  },
  openedContent: '',
  eventsSubscribers: {},
};
