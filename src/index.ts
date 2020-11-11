import { customElement, LitElement, html, property } from 'lit-element';

import { IBeforeInstallPromptEvent, IRelatedApp, IChoiceResult, IManifest, Manifest, IWindow } from './types/pwa-install.types';

declare const window: IWindow;

declare global {
	interface WindowEventMap {
		beforeinstallprompt: IBeforeInstallPromptEvent
	}
}

import styles from './styles.scss';
import template from './template';

@customElement('pwa-install')
export class PWAInstallElement extends LitElement {
	private manifest: IManifest = new Manifest();

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
	private appleInstallAvailable = false;
	private applePlatform = false;
	private howToRequested = false;
	private isUnderStandaloneMode = false;
	private isRelatedAppsInstalled = false;

	public install() {
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
	}

	public hide() {
		this.installAvailable = false;
		this.appleInstallAvailable = false;
		this.hideInstall = true;
		window.sessionStorage.setItem('pwa-hide-install', 'true');
	}

	public howTo = {
        handleEvent: () => { 
			this.howToRequested = !this.howToRequested;
			this.requestUpdate();
        },
        passive: true
    }

	private isAppleMobile() {
		if (
			(
				['iPhone', 'iPad', 'iPod'].includes(navigator.platform) ||
				(navigator.userAgent.match(/Mac/) && navigator.maxTouchPoints && navigator.maxTouchPoints > 2)
			)
			&& ('serviceWorker' in navigator))
			return true;
		return false;
	}
	private isStandalone() {
		if (window.matchMedia('(display-mode: standalone)').matches || ('standalone' in navigator && (navigator as any).standalone === true))
			return true;
		return false;
	}
	private checkInstalled() {
		this.isUnderStandaloneMode = this.isStandalone();

		if ('getInstalledRelatedApps' in navigator)
			(navigator as any).getInstalledRelatedApps().then((relatedApps: IRelatedApp[]) => {
				this.isRelatedAppsInstalled = relatedApps.find((app: IRelatedApp) => app.id === 'com.hostmeapp.hostmepanel') ? true : false;
			});

		if (this.isAppleMobile()) {
			this.applePlatform = true;
			if (!this.hideInstall && !this.isUnderStandaloneMode)
				setTimeout(
					() => {
						this.appleInstallAvailable = true;
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

		});

		window.addEventListener('appinstalled', (e) => {
			window.deferredEvent = null;
			this.installAvailable = false;
		});

		if (!this.name || !this.icon) {
			fetch('/manifest.json').then((response: Response) => {
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
		return html`${template(
			this.name, 
			this.description, 
			this.icon, 
			this.installAvailable,
			this.appleInstallAvailable,
			this.howTo,
			this.howToRequested
		)}`;
	}
}
