/// <reference types="dom-chromium-installation-events" />
import { ImageResource } from 'web-app-manifest';
export interface IRelatedApp {
    id: string;
    platform: string;
    url: string;
}
export interface IWindow extends Window {
    deferredEvent: BeforeInstallPromptEvent | null;
}
export declare class Manifest {
    constructor();
    short_name: string;
    icons: ImageResource[];
    screenshots?: ImageResource[];
    name: string;
    description: string;
}
