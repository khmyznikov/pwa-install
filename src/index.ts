import { LitElement, PropertyValues, html } from 'lit';
import { localized } from '@lit/localize';
import { property, state } from 'lit/decorators.js';
import { changeLocale, isRTL } from './localization';

import { Manifest } from './types/types';
import type { IRelatedApp, IWebInstallNavigator, IWindow, PWAInstallAttributes, WebInstallParams } from './types/types';

import PWAGalleryElement from './gallery';
import PWABottomSheetElement from './templates/chrome/bottom-sheet';

import Utils from './utils';

declare const window: IWindow;

import styles from './templates/chrome/styles.scss';
import stylesCommon from './templates/chrome/styles-common.scss'
import stylesApple from './templates/apple/styles-apple.scss';

import template from './templates/chrome/template';
import templateApple from './templates/apple/template-apple';

/**
 * @event {CustomEvent} pwa-install-success-event - App install success (Chromium/Android only)
 * @event {CustomEvent} pwa-install-fail-event - App install failed (Chromium/Android only)
 * @event {CustomEvent} pwa-user-choice-result-event - dismissed, accepted
 * @event {CustomEvent} pwa-install-available-event - App install available
 * @event {CustomEvent} pwa-install-how-to-event - App install instruction showed
 * @event {CustomEvent} pwa-install-gallery-event - App install gallery showed
 */
@localized()
export class PWAInstallElement extends LitElement {
	@property({attribute: 'manifest-url'}) manifestUrl = '/manifest.json';
	@property({attribute: 'manifest-id'}) manifestId = '';
	@property() icon = '';
	@property() name = '';
	@property() description = '';
	@property({attribute: 'install-description'}) installDescription = '';
	@property({attribute: 'disable-install-description', type: Boolean}) disableDescription = false;
	@property({attribute: 'disable-screenshots', type: Boolean}) disableScreenshots = false;
	@property({attribute: 'disable-screenshots-apple', type: Boolean}) disableScreenshotsApple = false;
	@property({attribute: 'disable-screenshots-chrome', type: Boolean}) disableScreenshotsChrome = false;
	@property({attribute: 'manual-apple', type: Boolean}) manualApple = false;
	@property({attribute: 'manual-chrome', type: Boolean}) manualChrome = false;
	@property({attribute: 'manual-how-to', type: Boolean}) manualHowTo = false;
	@property({attribute: 'disable-chrome', type: Boolean}) disableChrome = false;
	@property({attribute: 'disable-close', type: Boolean}) disableClose = false;
	@property({attribute: 'disable-android-fallback', type: Boolean}) disableFallback = false;
	@property({attribute: 'use-local-storage', type: Boolean}) useLocalStorage = false;
	@property({attribute: 'styles', type: Object}) styles: Record<string, string> = {};

	static get styles() {
		return [ styles, stylesCommon, stylesApple ];
	}

	@state() externalPromptEvent: BeforeInstallPromptEvent | null = null;

	public platforms: BeforeInstallPromptEvent['platforms'] = [];
	public userChoiceResult = '';

	public isDialogHidden: boolean = Utils.getStorageFlag('pwa-hide-install');
	public isInstallAvailable = false;
	public isAppleMobilePlatform = false;
	public isAppleDesktopPlatform = false;
	public isApple26Plus = false;
	public isAndroidFallback = false;
	public isAndroid = false;
	public isUnderStandaloneMode = false;
	public isRelatedAppsInstalled = false;
	public isWebInstallSupported = false;

	/** @internal */
	private _isRTL = false;

	/** @internal */
	private _manifest: Manifest = new Manifest();
	/** @internal */
	private _howToRequested = false;
	/** @internal */
	private _galleryRequested = false;
	/** @internal */
	private _nativeInstallFailed = false;
	/** @internal */
	private _installSuccessDispatched = false;
	/** @internal */
	private _activeInstallBackend: 'web-install' | 'beforeinstallprompt' | null = null;
	/** @internal */
	private _promptListenerAttached = false;
	/** @internal */
	private _appInstalledListenerAttached = false;
	/** @internal */
	private _install = {
		handleEvent: () => {
			void this.install();
		},
		passive: true
	}
	/** @internal */
	private _canUseLegacyFallback() {
		return Boolean(window.defferedPromptEvent) && Utils.isCurrentManifestTarget(this.manifestUrl);
	}
	/** @internal */
	private _setInstallAvailable(available: boolean) {
		const becameAvailable = available && !this.isInstallAvailable;
		this.isInstallAvailable = available;
		if (becameAvailable)
			Utils.eventInstallAvailable(this);
		this.requestUpdate();
	}
	/** @internal */
	private _dispatchInstalledSuccess(backend: 'web-install' | 'beforeinstallprompt' | 'browser') {
		if (this._installSuccessDispatched)
			return;

		this._installSuccessDispatched = true;
		Utils.eventInstalledSuccess(this, { backend });
	}
	/** @internal */
	private _captureBeforeInstallPrompt = (event: BeforeInstallPromptEvent) => {
		if (this.disableChrome)
			return;

		event.preventDefault();
		window.defferedPromptEvent = event;
		this.platforms = event.platforms;
		this.isAndroidFallback = false;
		this._installSuccessDispatched = false;

		const isCurrentManifestTarget = Utils.isCurrentManifestTarget(this.manifestUrl);
		const currentAppUnavailable = isCurrentManifestTarget &&
			(this.isUnderStandaloneMode || this.isRelatedAppsInstalled);
		const targetSupported = Utils.isWebInstallSupported() || isCurrentManifestTarget;
		this._setInstallAvailable(targetSupported && !currentAppUnavailable);
	}
	/** @internal */
	private _setupInstallListeners() {
		if (!this._promptListenerAttached) {
			window.addEventListener('beforeinstallprompt', this._captureBeforeInstallPrompt);
			this._promptListenerAttached = true;
		}

		if (!this._appInstalledListenerAttached && 'onappinstalled' in window) {
			window.addEventListener('appinstalled', this._handleAppInstalled);
			this._appInstalledListenerAttached = true;
		}
	}
	/** @internal */
	private _handleAppInstalled = () => {
		window.defferedPromptEvent = null;
		this._nativeInstallFailed = false;
		this._setInstallAvailable(false);
		this._dispatchInstalledSuccess(this._activeInstallBackend || 'browser');
		this._activeInstallBackend = null;
	}
	/** @internal */
	private async _runLegacyInstall() {
		const promptEvent = window.defferedPromptEvent;
		if (!promptEvent)
			return;

		this.hideDialog();
		window.defferedPromptEvent = null;
		this._activeInstallBackend = 'beforeinstallprompt';

		try {
			await promptEvent.prompt();
			const choiceResult = await promptEvent.userChoice;
			this.userChoiceResult = choiceResult.outcome;
			Utils.eventUserChoiceResult(this, this.userChoiceResult);
			if (choiceResult.outcome === 'dismissed')
				this._activeInstallBackend = null;
		} catch (error) {
			this._activeInstallBackend = null;
			Utils.eventInstalledFail(this, {
				backend: 'beforeinstallprompt',
				errorName: error instanceof Error ? error.name : 'Error',
				errorMessage: error instanceof Error ? error.message : String(error),
				fallbackAvailable: false
			});
		}
	}
	/** @internal */
	private async _runWebInstall() {
		const webInstallNavigator = navigator as IWebInstallNavigator;
		if (!webInstallNavigator.install)
			return;

		this._activeInstallBackend = 'web-install';
		try {
			const isCurrentDocumentInstall = !this.manifestUrl ||
				(!this.manifestId && Utils.isCurrentManifestTarget(this.manifestUrl));
			if (isCurrentDocumentInstall) {
				await webInstallNavigator.install();
			} else if (this.manifestUrl) {
				const params: WebInstallParams = {
					manifest: Utils.resolveManifestUrl(this.manifestUrl)
				};
				if (this.manifestId)
					params.manifestId = this.manifestId;
				await webInstallNavigator.install(params);
			}

			this._nativeInstallFailed = false;
			window.defferedPromptEvent = null;
			this.userChoiceResult = 'accepted';
			Utils.eventUserChoiceResult(this, this.userChoiceResult);
			this.hideDialog();
			this._setInstallAvailable(false);
			this._dispatchInstalledSuccess('web-install');
			this._activeInstallBackend = null;
		} catch (error) {
			const errorName = error instanceof Error ? error.name : 'Error';
			if (errorName === 'AbortError') {
				this._nativeInstallFailed = false;
				this._activeInstallBackend = null;
				this._hideDialogUser();
				return;
			}

			this._nativeInstallFailed = errorName !== 'InvalidStateError';
			this._activeInstallBackend = null;
			const fallbackAvailable = this._nativeInstallFailed && this._canUseLegacyFallback();
			Utils.eventInstalledFail(this, {
				backend: 'web-install',
				errorName,
				errorMessage: error instanceof Error ? error.message : String(error),
				fallbackAvailable,
				fallbackBackend: fallbackAvailable ? 'beforeinstallprompt' : undefined
			});
		}
	}
	public install = async () => {
		if (this.isAppleMobilePlatform || this.isAppleDesktopPlatform) {
			if (!Utils.isCurrentManifestTarget(this.manifestUrl)) {
				Utils.eventInstalledFail(this, {
					backend: 'manual',
					errorName: 'NotSupportedError',
					errorMessage: 'This platform cannot install a different app.',
					fallbackAvailable: false
				});
				return;
			}
			this._howToRequested = true;
			this.requestUpdate();
			return;
		}
		if (this.disableChrome)
			return;

		if (this._nativeInstallFailed && this._canUseLegacyFallback()) {
			await this._runLegacyInstall();
			return;
		}

		if (Utils.isWebInstallSupported()) {
			await this._runWebInstall();
			return;
		}

		if (this._canUseLegacyFallback()) {
			await this._runLegacyInstall();
			return;
		}

		Utils.eventInstalledFail(this, {
			backend: 'beforeinstallprompt',
			errorName: 'NotSupportedError',
			errorMessage: 'No compatible install prompt is available for this app.',
			fallbackAvailable: false
		});
	}
	/** @internal */
	private _hideDialog = {
		handleEvent: () => {
			this.isDialogHidden = true;
			Utils.setStorageFlag('pwa-hide-install', true, this.useLocalStorage);
			this.requestUpdate();
		},
		passive: true
	}
	/** @internal */
	private _hideDialogUser = () => {
		Utils.eventUserChoiceResult(this, 'dismissed');
		this.userChoiceResult = 'dismissed';
		this.hideDialog();
	}
	public hideDialog = () => {
		this._hideDialog.handleEvent();
	}
	public showDialog = (forced = false) => {
		this.isDialogHidden = false;
		if (forced)
			this.isInstallAvailable = true;
		Utils.setStorageFlag('pwa-hide-install', false, this.useLocalStorage);
		this.requestUpdate();
	}

	public getInstalledRelatedApps = async (): Promise<IRelatedApp[]> => {
		return await Utils.getInstalledRelatedApps();
	}

	/** @internal */
	private _toggleHowTo = {
        handleEvent: () => {
			this._howToRequested = !this._howToRequested;
			if (this._howToRequested && this._galleryRequested)
				this._galleryRequested = false;
			this.requestUpdate();

			if (this._howToRequested) {
				Utils.eventInstallHowTo(this);
			}				
        },
        passive: true
    }
	/** @internal */
	private _toggleGallery = {
        handleEvent: () => {
			this._galleryRequested = !this._galleryRequested;
			if (this._howToRequested && this._galleryRequested)
				this._howToRequested = false;

			this._galleryRequested && Utils.eventGallery(this);

			this.requestUpdate();
        },
        passive: true
    }
	/** @internal */
	private async _checkPlatform() {
		this.isUnderStandaloneMode = Utils.isStandalone();
		this.isRelatedAppsInstalled = await Utils.isRelatedAppsInstalled();
		this.isAppleMobilePlatform = Utils.isAppleMobile();
		this.isAppleDesktopPlatform = Utils.isAppleDesktop();
		this.isApple26Plus = Utils.isApple26Plus() && (this.isAppleMobilePlatform || this.isAppleDesktopPlatform);
		this.isAndroidFallback = Utils.isAndroidFallback();
		this.isAndroid = Utils.isAndroid();
		this.isWebInstallSupported = Utils.isWebInstallSupported();
	}
	/** @internal */
	private async _triggerAppleDialog() {
		setTimeout(() => {
			this.isInstallAvailable = true;
			this.requestUpdate();
			Utils.eventInstallAvailable(this);
		}, 500);
	}
	/** @internal */
	private async _checkInstallAvailable() {
		if (this.isUnderStandaloneMode && Utils.isCurrentManifestTarget(this.manifestUrl))
			return;

		if (this.isAppleMobilePlatform || this.isAppleDesktopPlatform) {
			if (!Utils.isCurrentManifestTarget(this.manifestUrl))
				return;
			this.manualApple && this.hideDialog();
			
			if (document.readyState === 'complete') {
				await this._triggerAppleDialog();
			} else {
				window.addEventListener('load', async () => {
					await this._triggerAppleDialog();
				});
			}
			return;
		}

		if (!this.disableChrome) {
			this.manualChrome && this.hideDialog();
			if (this.isWebInstallSupported) {
				this.isAndroidFallback = false;
				const currentAppUnavailable = Utils.isCurrentManifestTarget(this.manifestUrl) && this.isRelatedAppsInstalled;
				this._setInstallAvailable(!currentAppUnavailable);
			}
			if (this.externalPromptEvent != null)
				this._captureBeforeInstallPrompt(this.externalPromptEvent);
		}
		
		if (!this.disableFallback && this.isAndroid && Utils.isCurrentManifestTarget(this.manifestUrl) && !this.isWebInstallSupported && !window.defferedPromptEvent) {
			// browsers without BeforeInstallPromptEvent
			if (this.isAndroidFallback) {
				setTimeout(
					() => {
						this.isInstallAvailable = true;
						this.requestUpdate()
						Utils.eventInstallAvailable(this);
					},
					1000
				);
				return;
			}
			// trying to fix browsers like Opera with BeforeInstallPromptEvent not working
			if ('userActivation' in navigator && !this.isRelatedAppsInstalled) {
				const _activation = navigator.userActivation;
				const _activationHandler = setInterval(() => {
					if (_activation.isActive || _activation.hasBeenActive) {
						if (!window.defferedPromptEvent) {
							this.isAndroidFallback = true;
							this.isInstallAvailable = true;
							this.requestUpdate();
							Utils.eventInstallAvailable(this);
						}
						clearInterval(_activationHandler);
					}
				}, 1000);
				setTimeout(() => clearInterval(_activationHandler), 30000);
			}
		}
	}

	/** @internal */
	private _init = async () => {
		await this._checkPlatform();
		await this._checkInstallAvailable();

		Object.assign(this, await Utils.fetchAndProcessManifest(this.manifestUrl, this.icon, this.name, this.description));
	};
	/** @internal */
	private _requestUpdate = () => {
		this.requestUpdate();
	}

	async connectedCallback() {
		window.defferedPromptEvent = null;
		this._setupInstallListeners();
		await changeLocale(navigator.language);
		this._isRTL = isRTL();
		await this._init();
		PWAGalleryElement.finalized;
		PWABottomSheetElement.finalized;
		super.connectedCallback();
	}

	disconnectedCallback() {
		window.removeEventListener('beforeinstallprompt', this._captureBeforeInstallPrompt);
		window.removeEventListener('appinstalled', this._handleAppInstalled);
		this._promptListenerAttached = false;
		this._appInstalledListenerAttached = false;
		super.disconnectedCallback();
	}

	willUpdate(changedProperties: PropertyValues<this>) {
		if (changedProperties.has('manifestUrl') || changedProperties.has('manifestId')) {
			this._nativeInstallFailed = false;
			this._installSuccessDispatched = false;
		}
		if (this.externalPromptEvent && changedProperties.has('externalPromptEvent') && typeof this.externalPromptEvent == 'object') {
			this._captureBeforeInstallPrompt(this.externalPromptEvent);
		}
	}

	// firstUpdated() {
	// 	return;
	// }

	render() {
		if (this.isAppleMobilePlatform || this.isAppleDesktopPlatform)
			return html`${templateApple(
				this.name, 
				this.description, 
				this.installDescription,
				this.disableDescription,
				this.disableScreenshots || this.disableScreenshotsApple,
				this.disableClose,
				this.manualHowTo,
				this.icon, 
				this._manifest,
				this.isInstallAvailable && !this.isDialogHidden,
				this._hideDialogUser,
				this._toggleHowTo,
				this._howToRequested || this.manualHowTo,
				this._toggleGallery,
				this._galleryRequested,
				this._isRTL,
				this.isApple26Plus,
				this.isAppleDesktopPlatform,
				this.styles
			)}`;
		else
			return html`${template(
				this.name, 
				this.description, 
				this.installDescription,
				this.disableDescription,
				this.disableScreenshots || this.disableScreenshotsChrome,
				this.disableClose,
				this.icon, 
				this._manifest,
				this.isInstallAvailable && !this.isDialogHidden,
				this._hideDialogUser,
				this._install,
				this._toggleGallery,
				this._galleryRequested,
				this._toggleHowTo,
				this._howToRequested,
				this.isAndroidFallback,
				this._isRTL
			)}`;
	}
}

if (!customElements.get('pwa-install')) {
	customElements.define('pwa-install', PWAInstallElement);
}

export type { PWAInstallAttributes };
export type { PWAInstallProps } from './types/jsx';
