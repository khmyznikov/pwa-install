import { IRelatedApp } from './types/pwa-install.types';

export default class Utils {
    static isAppleMobile(): boolean {
		if (
                (
                    ['iPhone', 'iPad', 'iPod'].includes(navigator.platform) ||
                    (navigator.userAgent.match(/Mac/) && navigator.maxTouchPoints && navigator.maxTouchPoints > 2)
                )
                && ('serviceWorker' in navigator)
            )
			return true;
		return false;
    }
    
    static isStandalone() {
		if (window.matchMedia('(display-mode: standalone)').matches || ('standalone' in navigator && (navigator as any).standalone === true))
			return true;
		return false;
    }
    
    static async isRelatedAppsInstalled(): Promise<boolean> {
        if ('getInstalledRelatedApps' in navigator)
            await (navigator as any).getInstalledRelatedApps().then((relatedApps: IRelatedApp[]) => {
				return relatedApps.find((app: IRelatedApp) => app.id === 'com.learnpwa.app') ? true : false;
            });
        return false;
    }
}