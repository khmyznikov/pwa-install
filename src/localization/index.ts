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

const localizedTemplates = new Map([
  ['ru', ru],
  ['tr', tr],
  ['de', de],
  ['es', es],
  ['nl', nl],
  ['el', el],
  ['fr', fr],
  ['sr', sr],
])

export const { getLocale, setLocale } = configureLocalization({
  sourceLocale,
  targetLocales,
  // @ts-ignore
  loadLocale: async (lang: string) => localizedTemplates.get(lang)
});

export const changeLocale = (lang: string) => {
  try {
    setLocale(lang.slice(0, 2));
  }
  catch {
    console.warn(`pwa-install: translation error - unsupported locale: ${lang}`);
  }
};
