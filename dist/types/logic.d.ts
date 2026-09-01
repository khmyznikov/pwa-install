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
    private readonly host;
    private readonly getFetchedManifestId;
    readonly passive = true;
    private nativeInstallFailed;
    private installSuccessDispatched;
    private activeInstallBackend;
    private promptListenerAttached;
    private appInstalledListenerAttached;
    private androidFallbackTimer;
    private activationInterval;
    private activationTimeout;
    constructor(host: InstallLogicHost, getFetchedManifestId: () => unknown);
    handleEvent: () => void;
    connect(): void;
    disconnect(): void;
    reset(): void;
    dismiss(): void;
    captureBeforeInstallPrompt: (event: BeforeInstallPromptEvent) => void;
    checkAvailability(externalPromptEvent: BeforeInstallPromptEvent | null): void;
    install(): Promise<void>;
    private canUseLegacyFallback;
    private hasManifestId;
    private setInstallAvailable;
    private dispatchInstalledSuccess;
    private handleAppInstalled;
    private runLegacyInstall;
    private runWebInstall;
    private setupAndroidFallback;
    private clearAndroidFallbackTimers;
}
export {};
