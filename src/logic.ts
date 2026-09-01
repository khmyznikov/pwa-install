import type { IWebInstallNavigator, IWindow, WebInstallParams } from './types/types';
import Utils from './utils';

declare const window: IWindow;

type InstallBackend = 'web-install' | 'beforeinstallprompt';
type LegacyFallbackReason = 'missing-manifest-id' | 'web-install-failed' | 'web-install-unavailable';

interface InstallLogicHost extends Element {
	manifestUrl: string;
	manifestId: string;
	manualChrome: boolean;
	disableChrome: boolean;
	disableFallback: boolean;
	platforms: BeforeInstallPromptEvent['platforms'];
	userChoiceResult: string;
	isInstallAvailable: boolean;
	isAndroidFallback: boolean;
	isAndroid: boolean;
	isUnderStandaloneMode: boolean;
	isRelatedAppsInstalled: boolean;
	isWebInstallSupported: boolean;
	hideDialog(): void;
	requestUpdate(): void;
}

export default class InstallLogic {
	public readonly passive = true;

	private nativeInstallFailed = false;
	private installSuccessDispatched = false;
	private activeInstallBackend: InstallBackend | null = null;
	private promptListenerAttached = false;
	private appInstalledListenerAttached = false;
	private androidFallbackTimer: number | null = null;
	private activationInterval: number | null = null;
	private activationTimeout: number | null = null;

	constructor(
		private readonly host: InstallLogicHost,
		private readonly getFetchedManifestId: () => unknown
	) {}

	public handleEvent = () => {
		void this.install();
	}

	public connect() {
		window.defferedPromptEvent = null;
		if (!this.promptListenerAttached) {
			window.addEventListener('beforeinstallprompt', this.captureBeforeInstallPrompt);
			this.promptListenerAttached = true;
		}

		if (!this.appInstalledListenerAttached && 'onappinstalled' in window) {
			window.addEventListener('appinstalled', this.handleAppInstalled);
			this.appInstalledListenerAttached = true;
		}
	}

	public disconnect() {
		window.removeEventListener('beforeinstallprompt', this.captureBeforeInstallPrompt);
		window.removeEventListener('appinstalled', this.handleAppInstalled);
		this.promptListenerAttached = false;
		this.appInstalledListenerAttached = false;
		this.clearAndroidFallbackTimers();
	}

	public reset() {
		this.nativeInstallFailed = false;
		this.installSuccessDispatched = false;
	}

	public dismiss() {
		Utils.eventUserChoiceResult(this.host, 'dismissed');
		this.host.userChoiceResult = 'dismissed';
		this.host.hideDialog();
	}

	public captureBeforeInstallPrompt = (event: BeforeInstallPromptEvent) => {
		if (this.host.disableChrome)
			return;

		event.preventDefault();
		window.defferedPromptEvent = event;
		this.host.platforms = event.platforms;
		this.host.isAndroidFallback = false;
		this.installSuccessDispatched = false;

		const isCurrentManifestTarget = Utils.isCurrentManifestTarget(this.host.manifestUrl);
		const currentAppUnavailable = isCurrentManifestTarget &&
			(this.host.isUnderStandaloneMode || this.host.isRelatedAppsInstalled);
		const targetSupported = Utils.isWebInstallSupported() || isCurrentManifestTarget;
		this.setInstallAvailable(targetSupported && !currentAppUnavailable);
	}

	public checkAvailability(externalPromptEvent: BeforeInstallPromptEvent | null) {
		if (!this.host.disableChrome) {
			this.host.manualChrome && this.host.hideDialog();
			if (this.host.isWebInstallSupported) {
				this.host.isAndroidFallback = false;
				const currentAppUnavailable = Utils.isCurrentManifestTarget(this.host.manifestUrl) &&
					this.host.isRelatedAppsInstalled;
				this.setInstallAvailable(!currentAppUnavailable);
			}
			if (externalPromptEvent)
				this.captureBeforeInstallPrompt(externalPromptEvent);
		}

		this.setupAndroidFallback();
	}

	public async install() {
		if (this.host.disableChrome)
			return;

		if (this.nativeInstallFailed && this.canUseLegacyFallback()) {
			await this.runLegacyInstall('web-install-failed');
			return;
		}

		if (Utils.isWebInstallSupported() && !this.hasManifestId()) {
			if (this.canUseLegacyFallback()) {
				await this.runLegacyInstall('missing-manifest-id');
				return;
			}

			Utils.eventInstalledFail(this.host, {
				backend: 'web-install',
				errorName: 'DataError',
				errorMessage: 'Web Install API was not called because neither manifest-id nor an id in the fetched manifest is available.',
				fallbackAvailable: false
			});
			return;
		}

		if (Utils.isWebInstallSupported()) {
			await this.runWebInstall();
			return;
		}

		if (this.canUseLegacyFallback()) {
			await this.runLegacyInstall('web-install-unavailable');
			return;
		}

		Utils.eventInstalledFail(this.host, {
			backend: 'beforeinstallprompt',
			errorName: 'NotSupportedError',
			errorMessage: 'No compatible install prompt is available for this app.',
			fallbackAvailable: false
		});
	}

	private canUseLegacyFallback() {
		return Boolean(window.defferedPromptEvent) &&
			Utils.isCurrentManifestTarget(this.host.manifestUrl);
	}

	private hasManifestId() {
		const fetchedManifestId = this.getFetchedManifestId();
		return Boolean(this.host.manifestId.trim()) ||
			(typeof fetchedManifestId === 'string' && Boolean(fetchedManifestId.trim()));
	}

	private setInstallAvailable(available: boolean) {
		const becameAvailable = available && !this.host.isInstallAvailable;
		this.host.isInstallAvailable = available;
		if (becameAvailable)
			Utils.eventInstallAvailable(this.host);
		this.host.requestUpdate();
	}

	private dispatchInstalledSuccess(backend: InstallBackend | 'browser') {
		if (this.installSuccessDispatched)
			return;

		this.installSuccessDispatched = true;
		Utils.eventInstalledSuccess(this.host, { backend });
	}

	private handleAppInstalled = () => {
		window.defferedPromptEvent = null;
		this.nativeInstallFailed = false;
		this.setInstallAvailable(false);
		this.dispatchInstalledSuccess(this.activeInstallBackend || 'browser');
		this.activeInstallBackend = null;
	}

	private async runLegacyInstall(reason: LegacyFallbackReason) {
		const promptEvent = window.defferedPromptEvent;
		if (!promptEvent)
			return;

		this.host.hideDialog();
		window.defferedPromptEvent = null;
		this.activeInstallBackend = 'beforeinstallprompt';
		Utils.eventInstallBackend(this.host, 'beforeinstallprompt', reason);

		try {
			await promptEvent.prompt();
			const choiceResult = await promptEvent.userChoice;
			this.host.userChoiceResult = choiceResult.outcome;
			Utils.eventUserChoiceResult(this.host, this.host.userChoiceResult);
			if (choiceResult.outcome === 'dismissed')
				this.activeInstallBackend = null;
		} catch (error) {
			this.activeInstallBackend = null;
			Utils.eventInstalledFail(this.host, {
				backend: 'beforeinstallprompt',
				errorName: error instanceof Error ? error.name : 'Error',
				errorMessage: error instanceof Error ? error.message : String(error),
				fallbackAvailable: false
			});
		}
	}

	private async runWebInstall() {
		const webInstallNavigator = navigator as IWebInstallNavigator;
		if (!webInstallNavigator.install)
			return;

		this.activeInstallBackend = 'web-install';
		Utils.eventInstallBackend(this.host, 'web-install');
		try {
			const isCurrentDocumentInstall = !this.host.manifestUrl ||
				(!this.host.manifestId && Utils.isCurrentManifestTarget(this.host.manifestUrl));
			if (isCurrentDocumentInstall) {
				await webInstallNavigator.install();
			} else if (this.host.manifestUrl) {
				const params: WebInstallParams = {
					manifest: Utils.resolveManifestUrl(this.host.manifestUrl)
				};
				if (this.host.manifestId)
					params.manifestId = this.host.manifestId;
				await webInstallNavigator.install(params);
			}

			this.nativeInstallFailed = false;
			window.defferedPromptEvent = null;
			this.host.userChoiceResult = 'accepted';
			Utils.eventUserChoiceResult(this.host, this.host.userChoiceResult);
			this.host.hideDialog();
			this.setInstallAvailable(false);
			this.dispatchInstalledSuccess('web-install');
			this.activeInstallBackend = null;
		} catch (error) {
			const errorName = error instanceof Error ? error.name : 'Error';
			if (errorName === 'AbortError') {
				this.nativeInstallFailed = false;
				this.activeInstallBackend = null;
				this.dismiss();
				return;
			}

			this.nativeInstallFailed = errorName !== 'InvalidStateError';
			this.activeInstallBackend = null;
			const fallbackAvailable = this.nativeInstallFailed && this.canUseLegacyFallback();
			Utils.eventInstalledFail(this.host, {
				backend: 'web-install',
				errorName,
				errorMessage: error instanceof Error ? error.message : String(error),
				fallbackAvailable,
				fallbackBackend: fallbackAvailable ? 'beforeinstallprompt' : undefined
			});
		}
	}

	private setupAndroidFallback() {
		this.clearAndroidFallbackTimers();
		if (this.host.disableFallback || !this.host.isAndroid ||
			!Utils.isCurrentManifestTarget(this.host.manifestUrl) ||
			this.host.isWebInstallSupported || window.defferedPromptEvent)
			return;

		if (this.host.isAndroidFallback) {
			this.androidFallbackTimer = window.setTimeout(() => {
				this.setInstallAvailable(true);
			}, 1000);
			return;
		}

		if ('userActivation' in navigator && !this.host.isRelatedAppsInstalled) {
			const activation = navigator.userActivation;
			this.activationInterval = window.setInterval(() => {
				if (activation.isActive || activation.hasBeenActive) {
					if (!window.defferedPromptEvent) {
						this.host.isAndroidFallback = true;
						this.setInstallAvailable(true);
					}
					this.clearAndroidFallbackTimers();
				}
			}, 1000);
			this.activationTimeout = window.setTimeout(() => {
				this.clearAndroidFallbackTimers();
			}, 30000);
		}
	}

	private clearAndroidFallbackTimers() {
		if (this.androidFallbackTimer !== null)
			window.clearTimeout(this.androidFallbackTimer);
		if (this.activationInterval !== null)
			window.clearInterval(this.activationInterval);
		if (this.activationTimeout !== null)
			window.clearTimeout(this.activationTimeout);
		this.androidFallbackTimer = null;
		this.activationInterval = null;
		this.activationTimeout = null;
	}
}