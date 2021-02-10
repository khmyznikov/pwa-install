export interface IChoiceResult {
    outcome: 'accepted' | 'dismissed';
    platform: string;
}

export interface IBeforeInstallPromptEvent extends Event {
    platforms: string;
    userChoice: Promise<IChoiceResult>;
    prompt: () => {};
}

export interface IRelatedApp {
    id: string,
    platform: string,
    url: string
}

export interface IWindow extends Window {
    deferredEvent: IBeforeInstallPromptEvent | null;
}

export interface IPWAIcon {
    src: string;
}

export interface IManifest {
    short_name: string;
    name: string;
    description: string;
    icons: IPWAIcon[];
    screenshots?: IPWAIcon[] | null;
}

export class Manifest {
    constructor() {
        this.icons = [{ src: '' }];
        this.screenshots = null;
        this.short_name = 'PWA';
        this.name = 'Progressive web application';
        this.description = 'Progressive web application';
    }
    short_name: string;
    icons: IPWAIcon[];
    screenshots: IPWAIcon[] | null;
    name: string;
    description: string;
}
