import type { InstallTemplateOptions } from '../types';
export interface ChromeTemplateOptions extends InstallTemplateOptions {
    install: EventListenerOrEventListenerObject;
    toggleHowTo: EventListenerOrEventListenerObject;
    howToRequested: boolean;
    isAndroidFallback: boolean;
}
declare const template: ({ name, description, installDescription, disableDescription, disableScreenshots, disableClose, icon, manifest, installAvailable, hideDialog, install, toggleGallery, galleryRequested, toggleHowTo, howToRequested, isAndroidFallback, isRTL }: ChromeTemplateOptions) => import("lit-html").TemplateResult<1>;
export default template;
