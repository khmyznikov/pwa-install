import type { InstallTemplateOptions } from '../types';
export interface AppleTemplateOptions extends InstallTemplateOptions {
    manualHowTo: boolean;
    howToForApple: EventListenerOrEventListenerObject;
    howToRequested: boolean;
    isApple26Plus: boolean;
    isDesktop: boolean;
    customStyles: Record<string, string>;
}
declare const template: ({ name, description, installDescription, disableDescription, disableScreenshots, disableClose, manualHowTo, icon, manifest, installAvailable, hideDialog, howToForApple, howToRequested, toggleGallery, galleryRequested, isRTL, isApple26Plus, isDesktop, customStyles }: AppleTemplateOptions) => import("lit-html").TemplateResult<1>;
export default template;
