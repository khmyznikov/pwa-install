import { html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import { msg } from '@lit/localize';
import { t } from '../../messages';
import type { ManifestScreenshot } from '../../types/types';
import type { InstallTemplateOptions } from '../types';

export interface ChromeTemplateOptions extends InstallTemplateOptions {
    install: EventListenerOrEventListenerObject;
    toggleHowTo: EventListenerOrEventListenerObject;
    howToRequested: boolean;
    isAndroidFallback: boolean;
    inAppBrowser: boolean;
    customStyles: Record<string, string>;
    compactSheet: boolean;
}

const template = ({
    name,
    description,
    installDescription,
    disableDescription,
    disableScreenshots,
    disableClose,
    icon,
    manifest,
    installAvailable,
    hideDialog,
    install,
    toggleGallery,
    galleryRequested,
    toggleHowTo,
    howToRequested,
    isAndroidFallback,
    inAppBrowser,
    isRTL,
    messages,
    scheme,
    customStyles,
    compactSheet
}: ChromeTemplateOptions) => {
    const installDialogClasses = () => { return {available: installAvailable, gallery: galleryRequested }};
    const screenshotsAvailable = !disableScreenshots && manifest.screenshots && manifest.screenshots.length;
    const descriptionText = installDescription || `${t(messages, 'appFunctionality', msg('This site has app functionality.'))} ${t(messages, 'installForExperience', msg('Install it on your device for extensive experience and easy access.'))}`;
    const extraSlot = html`<slot class="extra" name="extra"></slot>`;

    return html`
        <div id="pwa-install-element" dir="${isRTL ? 'rtl' : 'ltr'}">
            <div class="install-dialog chrome ${classMap(installDialogClasses())}" part="dialog" style="${styleMap(customStyles)}">
                <div class="dialog-body">
                    <div class="icon">
                        <img src="${icon}" alt="icon" class="icon-image" draggable="false">
                    </div>
                    <div class="about">
                        <div class="name">
                            <label>${name}</label>
                            ${!disableClose? html`<button class="material-button secondary close" part="close-button" @click='${hideDialog}'>
                                <svg viewBox="0 0 24 24"><path d="M5.3 18.7c.2.2.4.3.7.3s.5-.1.7-.3l5.3-5.3 5.3 5.3a1.08 1.08 0 0 0 .7.3 1.08 1.08 0 0 0 .7-.3c.4-.4.4-1 0-1.4L13.4 12l5.3-5.3c.4-.4.4-1 0-1.4s-1-.4-1.4 0L12 10.6 6.7 5.3c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l5.3 5.3-5.3 5.3c-.4.4-.4 1 0 1.4z"/></svg>
                            </button>` : ''}
                        </div>
                        <div class="hostname">${location.hostname}</div>
                        
                    </div>
                    ${description ? html `<div class="description app-description">${description}</div>`: ''}
                    ${!disableDescription? 
                        html`<hr><div class="description install-description">${descriptionText}</div>` 
                        : ''}
                    ${screenshotsAvailable && installAvailable? html`<pwa-gallery .screenshots=${manifest.screenshots as ManifestScreenshot[]} .rtl="${isRTL}" .scheme="${scheme}"></pwa-gallery>`: ''}
                    ${compactSheet ? '' : extraSlot}
                    <div class="action-buttons">
                        ${screenshotsAvailable? html`<button class="material-button secondary" @click='${toggleGallery}'>${galleryRequested? t(messages, 'less', msg('Less')) : t(messages, 'more', msg('More'))}</button>`:''}
                        <button class="material-button primary install" part="install-button" @click='${install}'>${t(messages, 'install', msg('Install'))}</button>
                    </div>
                </div>
            </div>
            <div class="install-dialog chrome mobile ${classMap(installDialogClasses())}" part="dialog" style="${styleMap(customStyles)}">
                <pwa-bottom-sheet exportparts="install-button" .props=${{name, icon, description}} .disableClose=${disableClose} .install=${install} .hideDialog=${hideDialog} .toggleHowTo=${toggleHowTo} .howToRequested=${howToRequested} .fallback=${isAndroidFallback} .inAppBrowser=${inAppBrowser} .messages=${messages} .scheme="${scheme}">
                    ${compactSheet ? html`<slot class="extra" name="extra" slot="extra"></slot>` : ''}
                    ${screenshotsAvailable && installAvailable? html`<pwa-gallery .screenshots=${manifest.screenshots as ManifestScreenshot[]} .rtl="${isRTL}" .scheme="${scheme}"></pwa-gallery>`: ''}
                </pwa-bottom-sheet>
            </div>
        </div>`;
};
export default template;
