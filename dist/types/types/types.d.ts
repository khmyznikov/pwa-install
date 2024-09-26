import { ImageResource } from 'web-app-manifest';
export interface IRelatedApp {
    id: string;
    platform: string;
    url: string;
}
export interface IWindow extends Window {
    defferedPromptEvent: BeforeInstallPromptEvent | null;
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
export declare class Manifest {
    constructor();
    short_name: string;
    icons: ImageResource[];
    screenshots?: ImageResource[];
    name: string;
    description: string;
}
export {};
