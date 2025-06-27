import { ImageResource, WebAppManifest } from 'web-app-manifest';
export interface IRelatedApp {
    id: string;
    platform: string;
    url: string;
}
export interface IWindow extends Window {
    defferedPromptEvent: BeforeInstallPromptEvent | null;
    BeforeInstallPromptEvent: BeforeInstallPromptEvent;
}
type Booleanish = 'true' | 'false';
export interface PWAInstallAttributes {
    ['manual-apple']?: Booleanish;
    ['manual-chrome']?: Booleanish;
    ['disable-chrome']?: Booleanish;
    ['install-description']?: string;
    ['disable-install-description']?: Booleanish;
    ['manifest-url']?: string;
    name?: string;
    description?: string;
    icon?: string;
}
export interface ManifestScreenshot extends ImageResource {
    label?: string;
    platform?: "android" | "chromeos" | "ipados" | "ios" | "kaios" | "macos" | "windows" | "xbox" | "chrome_web_store" | "play" | "itunes" | "microsoft-inbox" | "microsoft-store";
    form_factor?: "wide" | "narrow";
}
export declare class Manifest implements WebAppManifest {
    constructor();
    short_name: string;
    icons: ImageResource[];
    screenshots?: ManifestScreenshot[];
    name: string;
    description: string;
}
export {};
