import { LitElement, PropertyValues } from 'lit';
import { localized } from '@lit/localize';
import { property, state } from 'lit/decorators.js';
import { changeLocale, isRTL } from './localization';

import { Manifest } from './types/types';
import type { IRelatedApp, PWAInstallAttributes } from './types/types';

import PWAGalleryElement from './gallery';
import PWABottomSheetElement from './templates/chrome/bottom-sheet';

import InstallLogic from './logic';
import Utils from './utils';

import styles from './templates/chrome/styles.scss';
import stylesCommon from './templates/chrome/styles-common.scss'
import stylesApple from './templates/apple/styles-apple.scss';

import template from './templates/chrome/template';
import templateApple from './templates/apple/template-apple';
import type { InstallTemplateOptions } from './templates/types';

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
	private _installLogic = new InstallLogic(this);

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

		await this._installLogic.install();
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
		this._installLogic.dismiss();
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

		this._installLogic.checkAvailability(this.externalPromptEvent);
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
		this._installLogic.connect();
		await changeLocale(navigator.language);
		this._isRTL = isRTL();
		await this._init();
		PWAGalleryElement.finalized;
		PWABottomSheetElement.finalized;
		super.connectedCallback();
	}

	disconnectedCallback() {
		this._installLogic.disconnect();
		super.disconnectedCallback();
	}

	willUpdate(changedProperties: PropertyValues<this>) {
		if (changedProperties.has('manifestUrl') || changedProperties.has('manifestId'))
			this._installLogic.reset();
		if (this.externalPromptEvent && changedProperties.has('externalPromptEvent') && typeof this.externalPromptEvent == 'object') {
			this._installLogic.captureBeforeInstallPrompt(this.externalPromptEvent);
		}
	}

	// firstUpdated() {
	// 	return;
	// }
	/** @internal */
	private _getTemplateOptions(disableScreenshots: boolean): InstallTemplateOptions {
		return {
			name: this.name,
			description: this.description,
			installDescription: this.installDescription,
			disableDescription: this.disableDescription,
			disableScreenshots,
			disableClose: this.disableClose,
			icon: this.icon,
			manifest: this._manifest,
			installAvailable: this.isInstallAvailable && !this.isDialogHidden,
			hideDialog: this._hideDialogUser,
			toggleGallery: this._toggleGallery,
			galleryRequested: this._galleryRequested,
			isRTL: this._isRTL
		};
	}

	render() {
		if (this.isAppleMobilePlatform || this.isAppleDesktopPlatform)
			return templateApple({
				...this._getTemplateOptions(this.disableScreenshots || this.disableScreenshotsApple),
				manualHowTo: this.manualHowTo,
				howToForApple: this._toggleHowTo,
				howToRequested: this._howToRequested || this.manualHowTo,
				isApple26Plus: this.isApple26Plus,
				isDesktop: this.isAppleDesktopPlatform,
				customStyles: this.styles
			});
		else
			return template({
				...this._getTemplateOptions(this.disableScreenshots || this.disableScreenshotsChrome),
				install: this._installLogic,
				toggleHowTo: this._toggleHowTo,
				howToRequested: this._howToRequested,
				isAndroidFallback: this.isAndroidFallback
			});
	}
}

if (!customElements.get('pwa-install')) {
	customElements.define('pwa-install', PWAInstallElement);
}

export type { PWAInstallAttributes };
export type { PWAInstallProps } from './types/jsx';
