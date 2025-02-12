import { PWAInstallElement } from '../types/index.js';
import { ReactWebComponent } from '@lit/react';
declare const PWAInstall: ReactWebComponent<PWAInstallElement, {
    onPwaInstallSuccessEvent: string;
    onPwaInstallFailEvent: string;
    onPwaUserChoiceResultEvent: string;
    onPwaInstallAvailableEvent: string;
    onPwaInstallHowToEvent: string;
    onPwaInstallGalleryEvent: string;
}>;
export default PWAInstall;
