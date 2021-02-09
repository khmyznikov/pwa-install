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
    id: string;
    platform: string;
    url: string;
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
}
export declare class Manifest {
    constructor();
    short_name: string;
    icons: IPWAIcon[];
    name: string;
    description: string;
}
