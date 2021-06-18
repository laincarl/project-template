/* eslint-disable */
const fs = require('fs');
const path = require('path');
const translate = require('@vitalets/google-translate-api');
const baseLocale = 'zh-CN';
const supportLocales = ['zh-TW', 'en']

async function translateFile(source, fromLocale, locale) {
  const result = {};
  for (const item of Object.entries(source)) {
    const [key, value] = item;
    const { defaultMessage, ...other } = source[key];
    try {
      const res = await translate(defaultMessage, { from: fromLocale, to: locale, tld: 'cn' });
      Object.assign(result, {
        [key]: {
          defaultMessage: res.text,
          ...other
        }
      })
    } catch (error) {
      console.log(error)
    }

  }
  fs.writeFileSync(path.resolve(__dirname, `../lang/${locale}.json`), JSON.stringify(result, null, 2))
}

const source = require(`../lang/${baseLocale}.json`);

supportLocales.forEach(locale => {
  translateFile(source, baseLocale, locale);
})