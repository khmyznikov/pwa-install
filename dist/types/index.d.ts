/// <reference types="dom-chromium-installation-events" />
import { LitElement } from 'lit';
import { IRelatedApp } from './types/types';
export declare class PWAInstallElement extends LitElement {
    private manifest;
    manifestUrl: string;
    icon: string;
    name: string;
    description: string;
    installDescription: string;
    disableDescription: boolean;
    manualApple: boolean;
    manualChrome: boolean;
    disableChrome: boolean;
    static get styles(): CSSStyleSheet[];
    platforms: BeforeInstallPromptEvent['platforms'];
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
    private _hideDialogUser;
    hideDialog: () => void;
    showDialog: (forced?: boolean) => void;
    getInstalledRelatedApps: () => Promise<IRelatedApp[]>;
    private _howToForApple;
    private _toggleGallery;
    private _checkInstalled;
    private _init;
    connectedCallback(): void;
    render(): import("lit-html").TemplateResult<1>;
}
