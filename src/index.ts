import { customElement, LitElement, html, property } from 'lit-element';

import { IBeforeInstallPromptEvent, IRelatedApp, IChoiceResult, IManifest, Manifest, IWindow } from './types/pwa-install.types';

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
	
	@property()
	'manifest-url' = '/manifest.json';

	@property()
	icon = '';

	@property()
	name = '';

	@property()
	description = '';

	static get styles() {
		return styles;
	}

	private platforms = '';
	private userChoiceResult = '';
	private hideInstall: boolean = JSON.parse(window.sessionStorage.getItem('pwa-hide-install') || 'false');
	private installAvailable = false;
	private appleMobilePlatform = false;
	private howToRequested = false;
	private isUnderStandaloneMode = false;
	private isRelatedAppsInstalled = false;

	public install = {
		handleEvent: () => { 
			if (window.deferredEvent) {
				window.deferredEvent.prompt();
				window.deferredEvent.userChoice
					.then((choiceResult: IChoiceResult) => {
						this.userChoiceResult = choiceResult.outcome;
						/**
						 * @event pwa-install-install
						 */
						console.log(choiceResult);
					})
					.catch((error) => {
						/**
						 * @event pwa-install-error
						 */
					});
				window.deferredEvent = null;
				this.installAvailable = false;
			}
		},
		passive: true
	}

	public hideDialog = {
		handleEvent: () => { 
			this.installAvailable = false;
			this.hideInstall = true;
			window.sessionStorage.setItem('pwa-hide-install', 'true');

			this.requestUpdate();
		},
		passive: true
	}

	public howToForApple = {
        handleEvent: () => { 
			this.howToRequested = !this.howToRequested;
			
			this.requestUpdate();
        },
        passive: true
    }

	private async checkInstalled() {
		this.isUnderStandaloneMode = Utils.isStandalone();
		this.isRelatedAppsInstalled = await Utils.isRelatedAppsInstalled();
		this.appleMobilePlatform = Utils.isAppleMobile();

		if (this.appleMobilePlatform) {
			if (!this.hideInstall && !this.isUnderStandaloneMode)
				setTimeout(
					() => {
						this.installAvailable = true;
						this.requestUpdate()
					},
					300
				);
		}
	}

	private init = () => {
		window.deferredEvent = null;

		this.checkInstalled();

		window.addEventListener('beforeinstallprompt', (e: IBeforeInstallPromptEvent) => {
			window.deferredEvent = e;
			e.preventDefault();

			this.platforms = e.platforms;

			if (this.userChoiceResult === 'dismissed' || this.userChoiceResult === 'accepted' || this.hideInstall || this.isRelatedAppsInstalled || this.isUnderStandaloneMode) {
				this.installAvailable = false;
			} else {
				this.installAvailable = true;
			}

			this.requestUpdate();
		});

		window.addEventListener('appinstalled', (e) => {
			window.deferredEvent = null;
			this.installAvailable = false;

			this.requestUpdate();
		});

		if (!this.name || !this.icon) {
			fetch(this['manifest-url']).then((response: Response) => {
				if (response.ok)
					response.json().then((_json) => {
						this.icon = _json.icons[0].src;
						this.name = _json['short_name'] || _json.name;
						this.description = _json.description;

						this.manifest = _json;
					});
				else {
					this.icon = this.manifest.icons[0].src;
					this.name = this.manifest['short_name'];
					this.description = this.manifest.description;
				}
			});
		}
	};

	connectedCallback() {
		this.init();
		super.connectedCallback();
	}

	render() {
		if (this.appleMobilePlatform)
			return html`${templateApple(
				this.name, 
				this.description, 
				this.icon, 
				this.installAvailable,
				this.hideDialog,
				this.howToForApple,
				this.howToRequested
			)}`;
		else
			return html`${template(
				this.name, 
				this.description, 
				this.icon, 
				this.installAvailable,
				this.hideDialog,
				this.install
			)}`;
	}
}
