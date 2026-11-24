export interface PwaInstallMessages {
	install: string;
	more: string;
	less: string;
	back: string;
	showGallery: string;
	appFunctionality: string;
	installForExperience: string;
	addToDockForExperience: string;
	addToHomeScreenForExperience: string;
	unsupportedBrowser: string;
	openInAppBrowserMenu: string;
	openBrowserMenu: string;
	tapOpenInBrowser: string;
	tapAddToHomeScreen: string;
	copyAppLink: string;
	openCopiedLink: string;
	pressMenu: string;
	pressMenuIfNoShare: string;
	pressShare: string;
	addToHome: string;
	pressViewMore: string;
	pressAddToDock: string;
	pressAddToHomeScreen: string;
	addToDock: string;
	addToHomeScreen: string;
}

export function t<K extends keyof PwaInstallMessages>(
	messages: Partial<PwaInstallMessages> | undefined,
	key: K,
	fallback: string
): string {
	const value = messages?.[key];
	return value == null ? fallback : value;
}
