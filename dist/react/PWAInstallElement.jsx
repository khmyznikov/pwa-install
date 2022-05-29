import React, { useEffect, useRef } from "react";
import "@khmyznikovpwa-installsrcindex.ts";

export function PWAInstallElement({
  children,
  manifestUrl,
  icon,
  name,
  description,
  installDescription,
  disableDescription,
  manualApple,
  manualChrome,
  disableChrome,
  platforms,
  userChoiceResult,
  isDialogHidden,
  isInstallAvailable,
  isAppleMobilePlatform,
  isUnderStandaloneMode,
  isRelatedAppsInstalled,
  install,
  hideDialog,
  showDialog,
  getInstalledRelatedApps,
}) {
  const ref = useRef(null);

  /** Properties - run whenever a property has changed */

  useEffect(() => {
    if (manifestUrl !== undefined && ref.current.manifestUrl !== manifestUrl) {
      ref.current.manifestUrl = manifestUrl;
    }
  }, [manifestUrl]);

  useEffect(() => {
    if (icon !== undefined && ref.current.icon !== icon) {
      ref.current.icon = icon;
    }
  }, [icon]);

  useEffect(() => {
    if (name !== undefined && ref.current.name !== name) {
      ref.current.name = name;
    }
  }, [name]);

  useEffect(() => {
    if (description !== undefined && ref.current.description !== description) {
      ref.current.description = description;
    }
  }, [description]);

  useEffect(() => {
    if (
      installDescription !== undefined &&
      ref.current.installDescription !== installDescription
    ) {
      ref.current.installDescription = installDescription;
    }
  }, [installDescription]);

  useEffect(() => {
    if (
      disableDescription !== undefined &&
      ref.current.disableDescription !== disableDescription
    ) {
      ref.current.disableDescription = disableDescription;
    }
  }, [disableDescription]);

  useEffect(() => {
    if (manualApple !== undefined && ref.current.manualApple !== manualApple) {
      ref.current.manualApple = manualApple;
    }
  }, [manualApple]);

  useEffect(() => {
    if (
      manualChrome !== undefined &&
      ref.current.manualChrome !== manualChrome
    ) {
      ref.current.manualChrome = manualChrome;
    }
  }, [manualChrome]);

  useEffect(() => {
    if (
      disableChrome !== undefined &&
      ref.current.disableChrome !== disableChrome
    ) {
      ref.current.disableChrome = disableChrome;
    }
  }, [disableChrome]);

  useEffect(() => {
    if (platforms !== undefined && ref.current.platforms !== platforms) {
      ref.current.platforms = platforms;
    }
  }, [platforms]);

  useEffect(() => {
    if (
      userChoiceResult !== undefined &&
      ref.current.userChoiceResult !== userChoiceResult
    ) {
      ref.current.userChoiceResult = userChoiceResult;
    }
  }, [userChoiceResult]);

  useEffect(() => {
    if (
      isDialogHidden !== undefined &&
      ref.current.isDialogHidden !== isDialogHidden
    ) {
      ref.current.isDialogHidden = isDialogHidden;
    }
  }, [isDialogHidden]);

  useEffect(() => {
    if (
      isInstallAvailable !== undefined &&
      ref.current.isInstallAvailable !== isInstallAvailable
    ) {
      ref.current.isInstallAvailable = isInstallAvailable;
    }
  }, [isInstallAvailable]);

  useEffect(() => {
    if (
      isAppleMobilePlatform !== undefined &&
      ref.current.isAppleMobilePlatform !== isAppleMobilePlatform
    ) {
      ref.current.isAppleMobilePlatform = isAppleMobilePlatform;
    }
  }, [isAppleMobilePlatform]);

  useEffect(() => {
    if (
      isUnderStandaloneMode !== undefined &&
      ref.current.isUnderStandaloneMode !== isUnderStandaloneMode
    ) {
      ref.current.isUnderStandaloneMode = isUnderStandaloneMode;
    }
  }, [isUnderStandaloneMode]);

  useEffect(() => {
    if (
      isRelatedAppsInstalled !== undefined &&
      ref.current.isRelatedAppsInstalled !== isRelatedAppsInstalled
    ) {
      ref.current.isRelatedAppsInstalled = isRelatedAppsInstalled;
    }
  }, [isRelatedAppsInstalled]);

  useEffect(() => {
    if (install !== undefined && ref.current.install !== install) {
      ref.current.install = install;
    }
  }, [install]);

  useEffect(() => {
    if (hideDialog !== undefined && ref.current.hideDialog !== hideDialog) {
      ref.current.hideDialog = hideDialog;
    }
  }, [hideDialog]);

  useEffect(() => {
    if (showDialog !== undefined && ref.current.showDialog !== showDialog) {
      ref.current.showDialog = showDialog;
    }
  }, [showDialog]);

  useEffect(() => {
    if (
      getInstalledRelatedApps !== undefined &&
      ref.current.getInstalledRelatedApps !== getInstalledRelatedApps
    ) {
      ref.current.getInstalledRelatedApps = getInstalledRelatedApps;
    }
  }, [getInstalledRelatedApps]);

  return <pwa-install ref={ref}>{children}</pwa-install>;
}
