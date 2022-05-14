import { configureLocalization } from '@lit/localize';
import {
	sourceLocale,
	targetLocales,
} from './locale-codes';

export const { getLocale, setLocale } = configureLocalization({
	sourceLocale,
	targetLocales,
	loadLocale: (lang: string) =>
		import(`./${lang}.ts`),
});

export const changeLocale = (lang: string) => {
	try {
		setLocale(lang.slice(0,2));
	}
	catch {
		console.warn(`pwa-install: translation error - unsupported locale: ${lang}`);
	}
};
