import { IRelatedApp } from './types/pwa-install.types';

const _eventDispatcher = (_element: Element, name: string, message: string) => {
    const event  = new CustomEvent(name, {
        detail: {
          message
        }
    });
    _element.dispatchEvent(event);
}
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

    static eventInstalledSuccess(_element: Element) {
        _eventDispatcher(_element, 'pwa-installed-success-event', 'Application installation successfully processed (Chromium/Android only)');
    }
    static eventInstalledFail(_element: Element) {
        _eventDispatcher(_element, 'pwa-installed-fail-event', 'Application installation failed (Chromium/Android only)');
    }
    static eventUserChoiceResult(_element: Element, message: string) {
        _eventDispatcher(_element, 'pwa-user-choice-result-event', message);
    }
    static eventInstallAvailable(_element: Element) {
        _eventDispatcher(_element, 'pwa-install-available-event', 'Application installation is available');
    }
    
}