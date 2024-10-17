import { LitElement, PropertyValues } from 'lit';
import { IRelatedApp, PWAInstallAttributes } from './types/types';
export declare class PWAInstallElement extends LitElement {
    manifestUrl: string;
    icon: string;
    name: string;
    description: string;
    installDescription: string;
    disableDescription: boolean;
    disableScreenshots: boolean;
    disableScreenshotsApple: boolean;
    disableScreenshotsChrome: boolean;
    manualApple: boolean;
    manualChrome: boolean;
    disableChrome: boolean;
    disableClose: boolean;
    useLocalStorage: boolean;
    static get styles(): CSSStyleSheet[];
    externalPromptEvent: BeforeInstallPromptEvent | null;
    platforms: BeforeInstallPromptEvent['platforms'];
    userChoiceResult: string;
    isDialogHidden: boolean;
    isInstallAvailable: boolean;
    isAppleMobilePlatform: boolean;
    isAppleDesktopPlatform: boolean;
    isUnderStandaloneMode: boolean;
    isRelatedAppsInstalled: boolean;
    private _manifest;
    private _howToRequested;
    private _galleryRequested;
    private _install;
    install: () => void;
    private _hideDialog;
    private _hideDialogUser;
    hideDialog: () => void;
    showDialog: (forced?: boolean) => void;
    getInstalledRelatedApps: () => Promise<IRelatedApp[]>;
    private _howToForApple;
    private _toggleGallery;
    private _checkInstalled;
    private _init;
    private _requestUpdate;
    connectedCallback(): void;
    willUpdate(changedProperties: PropertyValues<this>): void;
    render(): import("lit").TemplateResult<1>;
}
export { PWAInstallAttributes };
