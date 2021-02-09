import { customElement, LitElement, html, property } from 'lit-element';

import { IBeforeInstallPromptEvent, IRelatedApp, IChoiceResult, IManifest, Manifest, IWindow } from './pwa-install.types';

import Utils from './utils';

declare const window: IWindow;

declare global {
	interface WindowEventMap {
		beforeinstallprompt: IBeforeInstallPromptEvent
	}
}

import styles from './styles.scss';
import template from './template';
import templateApple from './template_apple';

@customElement('pwa-install')
export class PWAInstallElement extends LitElement {
	private manifest: IManifest = new Manifest();
	
	@property() 'manifest-url' = '/manifest.json';
	@property() icon = '';
	@property() name = '';
	@property() description = '';

	static get styles() {
		return styles;
	}

	public platforms = '';
	public userChoiceResult = '';

	public isDialogHidden: boolean = JSON.parse(window.sessionStorage.getItem('pwa-hide-install') || 'false');
	public isInstallAvailable = false;
	public isAppleMobilePlatform = false;
	public isUnderStandaloneMode = false;
	public isRelatedAppsInstalled = false;

	private _howToRequested = false;

	private _install = {
		handleEvent: () => { 
			if (window.deferredEvent) {
				window.deferredEvent.prompt();
				window.deferredEvent.userChoice
					.then((choiceResult: IChoiceResult) => {
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
	public hideDialog = () => {
		this._hideDialog.handleEvent();
	}
	public showDialog = () => {
		this.isDialogHidden = false;
		this.isInstallAvailable = true;
		this.requestUpdate();
	}

	public getInstalledRelatedApps = async (): Promise<IRelatedApp[]> => {
		return await Utils.getInstalledRelatedApps();
	}

	private _howToForApple = {
        handleEvent: () => { 
			this._howToRequested = !this._howToRequested;
			this.requestUpdate();
        },
        passive: true
    }

	private async _checkInstalled() {
		this.isUnderStandaloneMode = Utils.isStandalone();
		this.isRelatedAppsInstalled = await Utils.isRelatedAppsInstalled();
		this.isAppleMobilePlatform = Utils.isAppleMobile();

		if (this.isAppleMobilePlatform) {
			if (!this.isUnderStandaloneMode)
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

	private _init = () => {
		window.deferredEvent = null;

		this._checkInstalled();

		window.addEventListener('beforeinstallprompt', (e: IBeforeInstallPromptEvent) => {
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


		fetch(this['manifest-url']).then((response: Response) => {
			if (response.ok)
				response.json().then((_json) => {
					this.icon = this.icon || _json.icons[0].src;
					this.name = this.name || _json['short_name'] || _json.name;
					this.description = this.description || _json.description;

					this.manifest = _json;
				});
			else {
				this.icon = this.icon || this.manifest.icons[0].src;
				this.name = this.name || this.manifest['short_name'];
				this.description = this.description || this.manifest.description;
			}
		});
	};

	connectedCallback() {
		this._init();
		super.connectedCallback();
	}

	render() {
		if (this.isAppleMobilePlatform)
			return html`${templateApple(
				this.name, 
				this.description, 
				this.icon, 
				this.isInstallAvailable && !this.isDialogHidden,
				this._hideDialog,
				this._howToForApple,
				this._howToRequested
			)}`;
		else
			return html`${template(
				this.name, 
				this.description, 
				this.icon, 
				this.isInstallAvailable && !this.isDialogHidden,
				this._hideDialog,
				this._install
			)}`;
	}
}
