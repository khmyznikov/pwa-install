import { LitElement } from 'lit-element';
import { IBeforeInstallPromptEvent, IRelatedApp } from './types/types';
declare global {
    interface WindowEventMap {
        beforeinstallprompt: IBeforeInstallPromptEvent;
    }
}
export declare class PWAInstallElement extends LitElement {
    private manifest;
    'manifest-url': string;
    icon: string;
    name: string;
    description: string;
    static get styles(): CSSStyleSheet[];
    platforms: string;
    userChoiceResult: string;
    isDialogHidden: boolean;
    isInstallAvailable: boolean;
    isAppleMobilePlatform: boolean;
    isUnderStandaloneMode: boolean;
    isRelatedAppsInstalled: boolean;
    private _howToRequested;
    private _galleryRequested;
    private _install;
    install: () => void;
    private _hideDialog;
    hideDialog: () => void;
    showDialog: () => void;
    getInstalledRelatedApps: () => Promise<IRelatedApp[]>;
    private _howToForApple;
    private _toggleGallery;
    private _checkInstalled;
    private _init;
    connectedCallback(): void;
    render(): import("lit-element").TemplateResult;
}
