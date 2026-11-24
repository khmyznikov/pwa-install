import type { WebAppManifest } from 'web-app-manifest';
import type { PwaInstallMessages } from '../messages';

export type PwaInstallTheme = 'light' | 'dark' | 'system';

export interface InstallTemplateOptions {
	name: string;
	description: string;
	installDescription: string;
	disableDescription: boolean;
	disableScreenshots: boolean;
	disableClose: boolean;
	icon: string;
	manifest: WebAppManifest;
	installAvailable: boolean;
	hideDialog: EventListenerOrEventListenerObject;
	toggleGallery: EventListenerOrEventListenerObject;
	galleryRequested: boolean;
	isRTL: boolean;
	messages: Partial<PwaInstallMessages>;
	scheme: PwaInstallTheme;
}