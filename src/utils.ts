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

    static async getInstalledRelatedApps(): Promise<IRelatedApp[]> {
        if ('getInstalledRelatedApps' in navigator)
            await (navigator as any).getInstalledRelatedApps().then((relatedApps: IRelatedApp[]) => {
				return relatedApps;
            });
        return [];
    }
    
    static async isRelatedAppsInstalled(): Promise<boolean> {
        const _relatedApps = await this.getInstalledRelatedApps();
        return _relatedApps.length? true : false;
    }

    static appInstalledEvent(_element: Element) {
        const event  = new CustomEvent('app-installed-event', {
            detail: {
              message: 'Application is installed'
            }
        });
        _element.dispatchEvent(event);
    }
    
}