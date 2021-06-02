import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';
import App from './pages/index';

const currentLocale = 'en';
function loadLocaleData(locale: string) {
  switch (locale) {
    case 'zh-CN':
      return import('../compiled-lang/zh-CN.json');
    case 'en':
      return import('../compiled-lang/en.json');
    default:
      return import('../compiled-lang/zh-CN.json');
  }
}

(async () => {
  const messages = await loadLocaleData(currentLocale);

  ReactDOM.render(
    <IntlProvider
      locale={currentLocale}
      defaultLocale={currentLocale}
      // @ts-ignore
      messages={messages}
    >
      <App />
    </IntlProvider>,
    document.getElementById('root'),
  );
})();
