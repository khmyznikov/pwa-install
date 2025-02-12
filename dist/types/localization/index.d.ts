export declare const getLocale: (() => string) & {
    _LIT_LOCALIZE_GET_LOCALE_?: never;
}, setLocale: ((newLocale: string) => Promise<void>) & {
    _LIT_LOCALIZE_SET_LOCALE_?: never;
};
export declare const changeLocale: (lang: string) => Promise<void>;
export declare const isRTL: () => boolean;
