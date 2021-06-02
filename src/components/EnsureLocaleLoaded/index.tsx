import { useLayoutEffect, useState } from 'react';
import { IntlProvider } from 'react-intl';

const defaultLocale = 'zh-CN';
const supportLocales = [
  'zh-CN',
  'en',
];
function loadLocaleData(locale: string) {
  if (locale) {
    return import(`../../../compiled-lang/${locale}.json`);
  }
  return import('../../../compiled-lang/zh-CN.json');
}
interface EnsureLocaleLoadedProps {

}
const EnsureLocaleLoaded: React.FC<EnsureLocaleLoadedProps> = ({ children }) => {
  const [locale, setLocale] = useState(defaultLocale);
  const [loaded, setLoaded] = useState(false);
  const [messages, setMessages] = useState({});
  useLayoutEffect(() => {
    (async () => {
      const res = await loadLocaleData(locale);
      setMessages(res);
      setLoaded(true);
    })();
  }, [locale]);
  if (!loaded) {
    return null;
  }
  return (
    <IntlProvider
      locale={locale}
      defaultLocale={defaultLocale}
      messages={messages}
    >
      <select
        value={locale}
        onChange={(e) => {
          setLocale(e.target.value);
        }}
      >
        {supportLocales.map((l) => <option value={l}>{l}</option>)}
      </select>
      {children}
    </IntlProvider>
  );
};
export default EnsureLocaleLoaded;
