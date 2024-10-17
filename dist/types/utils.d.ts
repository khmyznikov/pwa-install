import { WebAppManifest } from 'web-app-manifest';
import { IRelatedApp } from './types/types';
export default class Utils {
    static isAppleMobile(): boolean;
    static isAppleDesktop(): boolean;
    static isStandalone(): boolean;
    static getInstalledRelatedApps(): Promise<IRelatedApp[]>;
    static isRelatedAppsInstalled(): Promise<boolean>;
    static eventInstalledSuccess(_element: Element): void;
    static eventInstalledFail(_element: Element): void;
    static eventUserChoiceResult(_element: Element, message: string): void;
    static eventInstallAvailable(_element: Element): void;
    static eventInstallHowTo(_element: Element): void;
    static eventGallery(_element: Element): void;
    static normalizeManifestAssetUrls(manifest: WebAppManifest, manifestUrl: string): void;
}
