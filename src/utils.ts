import { WebAppManifest } from 'web-app-manifest';
import { IRelatedApp, Manifest } from './types/types';

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

    static isAndroid(): boolean {
        if (navigator.userAgent.toLowerCase().match(/android/))
            return true;
        return false;
    }

    static isAndroidFallback(): boolean {
        if (this.isAndroid() && !('BeforeInstallPromptEvent' in window))
            return true;
        return false;
    }

    static deviceFormFactor(): 'narrow' | 'wide' {
        return window.matchMedia('(orientation: portrait)').matches? 'narrow' : 'wide';
    }
    
    static isStandalone() {
		if (window.matchMedia('(display-mode: standalone)').matches || ('standalone' in navigator && (navigator as any).standalone === true))
			return true;
		return false;
    }

    static async getInstalledRelatedApps(): Promise<IRelatedApp[]> {
        if ('getInstalledRelatedApps' in navigator)
            try{
                return await (navigator as any).getInstalledRelatedApps().then((relatedApps: IRelatedApp[]) => {
                    return relatedApps;
                });
            } catch (e) {}
            
        return [];
    }
    
    static async isRelatedAppsInstalled(): Promise<boolean> {
        const _relatedApps = await this.getInstalledRelatedApps();
        return _relatedApps.length? true : false;
    }

    static setStorageFlag(name: string, value:boolean, persistent: boolean = false) {
        try {
            if (persistent)
                localStorage.setItem(name, value.toString());
            else
                sessionStorage.setItem(name, value.toString());
        } catch (e) {}
    }
    static getStorageFlag(name: string): boolean {
        try {
            return sessionStorage.getItem(name) === 'true' || localStorage.getItem(name) === 'true';
        } catch (e) {
            return false;
        }
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

    static normalizeManifestAssetUrls(manifest: WebAppManifest, manifestUrl: string) {
        const normalizedManifestUrl = new URL(manifestUrl, document.location.href);
        [...manifest.icons || [], ...manifest.screenshots || []].forEach(asset => {
            asset.src = new URL(asset.src, normalizedManifestUrl).href;
        })
    }

    static async fetchAndProcessManifest(manifestUrl: string, icon: string, name: string, description: string): Promise<{_manifest: WebAppManifest, icon: string, name: string, description: string}> {
        let _manifest: WebAppManifest = new Manifest();
        let _json: WebAppManifest | null = null;
        try{
			const _response = await fetch(manifestUrl);
			_json = await _response.json() as WebAppManifest;
			if (!_response.ok || !_json || !Object.keys(_json))
				throw new Error('Manifest not found');
			this.normalizeManifestAssetUrls(_json, manifestUrl);
        }  
        catch(e) {}    

        icon = icon || (_json?.icons?.length ? _json?.icons![0].src : _manifest.icons?.[0].src) || '';
        name = name || (_json? _json['short_name']: _manifest['short_name']) || '';
        description = description || _json?.description || _manifest.description || '';
		_manifest = _json || _manifest;
        
        return {
            _manifest,
            icon,
            name,
            description
        }
    }
}