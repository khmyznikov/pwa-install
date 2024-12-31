import { WebAppManifest } from 'web-app-manifest';
import { IRelatedApp } from './types/types';
export default class Utils {
    static isAppleMobile(): boolean;
    static isAppleDesktop(): boolean;
    static isAndroid(): boolean;
    static isAndroidFallback(): boolean;
    static deviceFormFactor(): 'narrow' | 'wide';
    static isStandalone(): boolean;
    static getInstalledRelatedApps(): Promise<IRelatedApp[]>;
    static isRelatedAppsInstalled(): Promise<boolean>;
    static setStorageFlag(name: string, value: boolean, persistent?: boolean): void;
    static getStorageFlag(name: string): boolean;
    static eventInstalledSuccess(_element: Element): void;
    static eventInstalledFail(_element: Element): void;
    static eventUserChoiceResult(_element: Element, message: string): void;
    static eventInstallAvailable(_element: Element): void;
    static eventInstallHowTo(_element: Element): void;
    static eventGallery(_element: Element): void;
    static normalizeManifestAssetUrls(manifest: WebAppManifest, manifestUrl: string): void;
    static fetchAndProcessManifest(manifestUrl: string, icon: string, name: string, description: string): Promise<{
        _manifest: WebAppManifest;
        icon: string;
        name: string;
        description: string;
    }>;
}
