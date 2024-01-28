import { IRelatedApp } from './types/types';

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
	    return (
            (
                ['iPhone', 'iPad', 'iPod'].includes(navigator.platform) ||
                (navigator.userAgent.match(/Mac/) && navigator.maxTouchPoints && navigator.maxTouchPoints > 2)
            )
            && ('serviceWorker' in navigator) || false);
    }

    static isAppleDesktop(): boolean {
        // check if it's a mac
        const userAgent = navigator.userAgent.toLowerCase();
        if (navigator.maxTouchPoints || !userAgent.match(/macintosh/))
            return false;
        // check safari version >= 17
        const version = /version\/(\d{2})\./.exec(userAgent)
        if (!version || !version[1] || !(parseInt(version[1]) >= 17))
            return false;
        // hacky way to detect Sonoma
        const audioCheck = document.createElement('audio').canPlayType('audio/wav; codecs="1"') ? true : false;
        const webGLCheck = new OffscreenCanvas(1, 1).getContext('webgl') ? true : false;

        return audioCheck && webGLCheck;
    }
    
    static isStandalone() {
	    return (window.matchMedia('(display-mode: standalone)').matches || ('standalone' in navigator && (navigator as any).standalone === true));
    }

    static async getInstalledRelatedApps(): Promise<IRelatedApp[]> {
        if ('getInstalledRelatedApps' in navigator)
            try{
                await (navigator as any).getInstalledRelatedApps().then((relatedApps: IRelatedApp[]) => {
                    return relatedApps;
                });
            } catch (e) {}
            
        return [];
    }
    
    static async isRelatedAppsInstalled(): Promise<boolean> {
        const _relatedApps = await this.getInstalledRelatedApps();
        return _relatedApps.length? true : false;
    }

    static eventInstalledSuccess(_element: Element) {
        _eventDispatcher(_element, 'pwa-install-success-event', 'App install success (Chromium/Android only)');
    }
    static eventInstalledFail(_element: Element) {
        _eventDispatcher(_element, 'pwa-install-fail-event', 'App install failed (Chromium/Android only)');
    }
    static eventUserChoiceResult(_element: Element, message: string) {
        _eventDispatcher(_element, 'pwa-user-choice-result-event', message);
    }
    static eventInstallAvailable(_element: Element) {
        _eventDispatcher(_element, 'pwa-install-available-event', 'App install available');
    }
    static eventInstallHowTo(_element: Element) {
        _eventDispatcher(_element, 'pwa-install-how-to-event', 'App install instruction showed');
    }
    static eventGallery(_element: Element) {
        _eventDispatcher(_element, 'pwa-install-gallery-event', 'App install gallery showed');
    }
    
}
