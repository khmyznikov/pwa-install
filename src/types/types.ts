import { ImageResource } from 'web-app-manifest';

export interface IRelatedApp {
    id: string,
    platform: string,
    url: string
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
    platform?: string;
    form_factor?: "wide" | "narrow";
}

export class Manifest {
    constructor() {
        this.icons = [{ src: '' }];
        this.screenshots = undefined;
        this.short_name = 'PWA';
        this.name = 'Progressive web application';
        this.description = 'Progressive web application';
    }
    short_name: string;
    icons: ImageResource[];
    screenshots?: ManifestScreenshot[];
    name: string;
    description: string;
}
