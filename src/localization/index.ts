import { configureLocalization } from '@lit/localize';
import {
  sourceLocale,
  targetLocales,
} from './locale-codes';

import * as ru from './locales/ru';
import * as tr from './locales/tr';
import * as de from "./locales/de";
import * as es from "./locales/es";
import * as nl from "./locales/nl";
import * as el from "./locales/el";
import * as fr from "./locales/fr";
import * as sr from "./locales/sr";
import * as pl from "./locales/pl";
import * as uk from "./locales/uk";
import * as zhHK from "./locales/zh-HK";
import * as zhCN from "./locales/zh-CN";
import * as it from "./locales/it";
import * as cs from "./locales/cs";
import * as no from "./locales/no";
import * as pt from "./locales/pt";
import * as ja from "./locales/ja";
import * as sv from "./locales/sv";
import * as ko from "./locales/ko";
import * as km from "./locales/km";
import * as fa from "./locales/fa";
import * as da from "./locales/da";
import * as vi from "./locales/vi";

const localizedTemplates = new Map([
  ['ru', ru],
  ['tr', tr],
  ['de', de],
  ['es', es],
  ['nl', nl],
  ['el', el],
  ['fr', fr],
  ['sr', sr],
  ['pl', pl],
  ['uk', uk],
  ['zh-HK', zhHK],
  ['zh-CN', zhCN],
  ['it', it],
  ['cs', cs],
  ['no', no], // + nb
  ['pt', pt],
  ['ja', ja],
  ['sv', sv],
  ['ko', ko],
  ['km', km],
  ['fa', fa],
  ['da', da],
  ['vi', vi],
])

export const { getLocale, setLocale } = configureLocalization({
  sourceLocale,
  targetLocales,
  // @ts-ignore
  loadLocale: async (lang: string) => localizedTemplates.get(lang)
});

export const changeLocale = async (lang: string) => {
  // Norwegian Bokmål is same as Norwegian
  switch (lang.slice(0, 2)) {
    case 'nb':
      lang = 'no';
      break;
    default:
      break;
  }

  // Fallback to simplified Chinese
  switch (lang) {
    case 'zh':
    case 'zh-TW':
      lang = 'zh-CN';
      break;
    default:
      break;
  }

  try {
    if (localizedTemplates.get(lang))
      await setLocale(lang);
    else
      await setLocale(lang.slice(0, 2));
  }
  catch {
    console.warn(`pwa-install: translation error - unsupported locale: ${lang}`);
  }
};

export const isRTL = () => {
  let locale = getLocale();
  return ['ar', 'he', 'fa', 'ur'].includes(getLocale());
}
