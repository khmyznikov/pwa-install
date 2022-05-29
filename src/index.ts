import { LitElement, html } from 'lit';
import { localized } from '@lit/localize';
import { property, customElement } from 'lit/decorators.js';
import { WebAppManifest } from 'web-app-manifest';
import { changeLocale } from './localization';

import { IRelatedApp, Manifest, IWindow, PWAInstallAttributes } from './types/types';

import PWAGalleryElement from './gallery';
import PWABottomSheetElement from './templates/chrome/bottom-sheet';

import Utils from './utils';

declare const window: IWindow;

import styles from './templates/chrome/styles.scss';
import stylesApple from './templates/apple/styles-apple.scss';

import template from './templates/chrome/template';
import templateApple from './templates/apple/template-apple';


@localized()
@customElement('pwa-install')
export class PWAInstallElement extends LitElement {
	private manifest: WebAppManifest = new Manifest();

	@property({attribute: 'manifest-url'}) manifestUrl = '/manifest.json';
	@property() icon = '';
	@property() name = '';
	@property() description = '';
	@property({attribute: 'install-description'}) installDescription = '';
	@property({attribute: 'disable-install-description', type: Boolean}) disableDescription = false;
	@property({attribute: 'manual-apple', type: Boolean}) manualApple = false;
	@property({attribute: 'manual-chrome', type: Boolean}) manualChrome = false;
	@property({attribute: 'disable-chrome', type: Boolean}) disableChrome = false;

	static get styles() {
		return [ styles, stylesApple ];
	}

	public platforms: BeforeInstallPromptEvent['platforms'] = [];
	public userChoiceResult = '';

	public isDialogHidden: boolean = JSON.parse(window.sessionStorage.getItem('pwa-hide-install') || 'false');
	public isInstallAvailable = false;
	public isAppleMobilePlatform = false;
	public isUnderStandaloneMode = false;
	public isRelatedAppsInstalled = false;

	private _howToRequested = false;
	private _galleryRequested = false;

	private _install = {
		handleEvent: () => {
			if (window.deferredEvent) {
				this.hideDialog();
				window.deferredEvent.prompt();
				window.deferredEvent.userChoice
					.then((choiceResult: PromptResponseObject) => {
						this.userChoiceResult = choiceResult.outcome;
						Utils.eventUserChoiceResult(this, this.userChoiceResult);
					})
					.catch((error) => {
						Utils.eventInstalledFail(this);
					});
				window.deferredEvent = null;
			}
		},
		passive: true
	}
	public install = () => {
		if (this.isAppleMobilePlatform) {
			this._howToRequested = true;
			this.requestUpdate();
		}
		else
			this._install.handleEvent();
	}

	private _hideDialog = {
		handleEvent: () => {
			this.isDialogHidden = true;
			window.sessionStorage.setItem('pwa-hide-install', 'true');
			this.requestUpdate();
		},
		passive: true
	}
	private _hideDialogUser = () => {
		Utils.eventUserChoiceResult(this, 'dismissed');
		this.hideDialog();
	}
	public hideDialog = () => {
		this._hideDialog.handleEvent();
	}
	public showDialog = (forced = false) => {
		this.isDialogHidden = false;
		if (forced)
			this.isInstallAvailable = true;
		window.sessionStorage.setItem('pwa-hide-install', 'false');
		this.requestUpdate();
	}

	public getInstalledRelatedApps = async (): Promise<IRelatedApp[]> => {
		return await Utils.getInstalledRelatedApps();
	}

	private _howToForApple = {
        handleEvent: () => {
			this._howToRequested = !this._howToRequested;
			if (this._howToRequested && this._galleryRequested)
				this._galleryRequested = false;
			this.requestUpdate();
        },
        passive: true
    }

	private _toggleGallery = {
        handleEvent: () => {
			this._galleryRequested = !this._galleryRequested;
			if (this._howToRequested && this._galleryRequested)
				this._howToRequested = false;
			this.requestUpdate();
        },
        passive: true
    }

	private async _checkInstalled() {
		this.isUnderStandaloneMode = Utils.isStandalone();
		this.isRelatedAppsInstalled = await Utils.isRelatedAppsInstalled();
		this.isAppleMobilePlatform = Utils.isAppleMobile();

		if (this.isAppleMobilePlatform) {
			if (!this.isUnderStandaloneMode) {
				this.manualApple && this.hideDialog();
				setTimeout(
					() => {
						this.isInstallAvailable = true;
						this.requestUpdate()
						Utils.eventInstallAvailable(this);
					},
					300
				);
			}
		}
		else {
			this.manualChrome && this.hideDialog();
		}
	}

	private _init = () => {
		window.deferredEvent = null;

		this._checkInstalled();

		if (!this.disableChrome)
			window.addEventListener('beforeinstallprompt', (e: BeforeInstallPromptEvent) => {
				window.deferredEvent = e;
				e.preventDefault();

				this.platforms = e.platforms;

				if (this.isRelatedAppsInstalled || this.isUnderStandaloneMode) {
					this.isInstallAvailable = false;
				} else {
					this.isInstallAvailable = true;
					Utils.eventInstallAvailable(this);
				}

				if (this.userChoiceResult === 'accepted'){
					this.isDialogHidden = true;
					Utils.eventInstalledSuccess(this);
				}

				this.requestUpdate();
			});

		window.addEventListener('appinstalled', (e) => {
			window.deferredEvent = null;
			this.isInstallAvailable = false;

			this.requestUpdate();
			Utils.eventInstalledSuccess(this);
		});


		fetch(this.manifestUrl).then((response: Response) => {
			if (response.ok)
				response.json().then((_json) => {
					this.icon = this.icon || _json.icons[0].src;
					this.name = this.name || _json['short_name'] || _json.name;
					this.description = this.description || _json.description;
					this.manifest = _json;
				});
			else {
				this.icon = this.icon || this.manifest.icons?.[0].src || '';
				this.name = this.name || this.manifest['short_name'] || '';
				this.description = this.description || this.manifest.description || '';
			}
		});


	};

	connectedCallback() {
		changeLocale(navigator.language);
		this._init();
		PWAGalleryElement.finalized;
		PWABottomSheetElement.finalized;
		super.connectedCallback();
	}

	// firstUpdated() {
	// 	return;
	// }

	render() {
		if (this.isAppleMobilePlatform)
			return html`${templateApple(
				this.name, 
				this.description, 
				this.installDescription,
				this.disableDescription,
				this.icon, 
				this.manifest,
				this.isInstallAvailable && !this.isDialogHidden,
				this._hideDialogUser,
				this._howToForApple,
				this._howToRequested,
				this._toggleGallery,
				this._galleryRequested
			)}`;
		else
			return html`${template(
				this.name, 
				this.description, 
				this.installDescription,
				this.disableDescription,
				this.icon, 
				this.manifest,
				this.isInstallAvailable && !this.isDialogHidden,
				this._hideDialogUser,
				this._install,
				this._toggleGallery,
				this._galleryRequested
			)}`;
	}
}

export { PWAInstallAttributes };
