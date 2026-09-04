import { html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import { msg } from '@lit/localize';
import Utils from '../../utils';
import type { InstallTemplateOptions } from '../types';

export interface AppleTemplateOptions extends InstallTemplateOptions {
    manualHowTo: boolean;
    howToForApple: EventListenerOrEventListenerObject;
    howToRequested: boolean;
    isApple26Plus: boolean;
    isDesktop: boolean;
    customStyles: Record<string, string>;
    linkCopied: boolean;
    safariUrl: string;
    copyCurrentUrl: EventListenerOrEventListenerObject;
}

const template = ({
    name,
    description,
    installDescription,
    disableDescription,
    disableScreenshots,
    disableClose,
    manualHowTo,
    icon,
    manifest,
    installAvailable,
    hideDialog,
    howToForApple,
    howToRequested,
    toggleGallery,
    galleryRequested,
    isRTL,
    isApple26Plus,
    isDesktop,
    customStyles,
    linkCopied,
    safariUrl,
    copyCurrentUrl
}: AppleTemplateOptions) => {
    const inAppBrowser = Utils.isInAppBrowser() || !Utils.isServiceWorkerSupported();
    const screenshotsAvailable = !disableScreenshots && manifest.screenshots && manifest.screenshots.length;
    const installDialogClassesApple = () => { return {available: installAvailable, aqua: isApple26Plus, 'how-to': howToRequested, 'how-to-manual': manualHowTo, gallery: galleryRequested, desktop: isDesktop, "apple-mobile": !isDesktop}; };
    let styles = { '--tint-color': Utils.getPageBackgroundColor(), ...customStyles };

    return html`
        <aside id="pwa-install-element" dir="${isRTL ? 'rtl' : 'ltr'}">
            <article class="install-dialog apple ${classMap(installDialogClassesApple())} dialog-body" style="${styleMap(styles)}">
                <div class="icon">
                    <img src="${icon}" alt="icon" class="icon-image" draggable="false">
                </div>
                <div class="about">
                    <div class="name">
                        ${name}
                    </div>
                    <div class="description">${description || location.hostname}</div>
                </div>
                ${!disableClose? html`<button type="button" title="close" class="close" @click='${hideDialog}' ontouchstart="">
                    <svg viewBox="0 0 24 24"><path d="M5.3 18.7c.2.2.4.3.7.3s.5-.1.7-.3l5.3-5.3 5.3 5.3a1.08 1.08 0 0 0 .7.3 1.08 1.08 0 0 0 .7-.3c.4-.4.4-1 0-1.4L13.4 12l5.3-5.3c.4-.4.4-1 0-1.4s-1-.4-1.4 0L12 10.6 6.7 5.3c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l5.3 5.3-5.3 5.3c-.4.4-.4 1 0 1.4z"/></svg>
                </button>` : ''}
                ${!disableDescription? html`<div class="welcome-to-install">
                    ${installDescription? installDescription: `${msg('This site has app functionality.')} ${isDesktop? msg('Add it to your Dock for extensive experience and easy access.') : msg('Add it to your Home Screen for extensive experience and easy access.')}`}</div>` 
                : '' }
                <div class="how-to-body">
                    <div class="how-to-description ${classMap({ 'in-app-browser': inAppBrowser })}">
                        ${!isDesktop && inAppBrowser? html`
                        <a class="description-step copy-link ${classMap({copied: linkCopied})}" href=${safariUrl} @click=${copyCurrentUrl}>
                            <span class="svg-wrap" aria-hidden="true">
                                <svg id="pwa-copy-document" width="24" height="24" viewBox="0 0 19.966 24.591">
                                    <path d="m14.06.975 4.932 5.013c.728.75.974 1.517.974 2.71v7.923c0 2.036-1.017 3.064-3.032 3.064h-1.7v-1.57h1.623c1.007 0 1.529-.543 1.529-1.518V8.248h-4.569c-1.112 0-1.664-.541-1.664-1.674V1.57h-4.31c-1.017 0-1.54.55-1.54 1.518v1.784h-1.57v-1.81C4.733 1.029 5.744 0 7.755 0h3.749c1.05 0 1.859.257 2.556.975m-.492 5.374c0 .345.138.485.483.485h3.928l-4.41-4.496Z"/>
                                    <path d="M0 21.494c0 2.047 1.007 3.064 3.022 3.064h9.179c2.015 0 3.032-1.026 3.032-3.064v-7.62c0-1.257-.145-1.796-.924-2.597l-5.39-5.48c-.737-.758-1.347-.924-2.45-.924H3.022C1.011 4.873 0 5.9 0 7.937Zm1.57-.025V7.961c0-.966.523-1.517 1.54-1.517h3.199v5.661c0 1.237.625 1.838 1.838 1.838h5.506v7.526c0 .976-.522 1.518-1.529 1.518H3.1c-1.006 0-1.528-.542-1.528-1.518m6.757-8.993c-.389 0-.55-.162-.55-.551V6.799l5.573 5.677Z"/>
                                </svg>
                                <svg id="pwa-safari" width="24" height="26" viewBox="0 0 20.283 19.932">
                                    <g fill="currentColor"><path d="M9.96 19.922c5.45 0 9.962-4.522 9.962-9.961C19.922 4.51 15.4 0 9.952 0 4.511 0 0 4.512 0 9.96c0 5.44 4.521 9.962 9.96 9.962m0-1.66A8.26 8.26 0 0 1 1.67 9.96c0-4.61 3.672-8.3 8.281-8.3 4.61 0 8.31 3.69 8.31 8.3s-3.69 8.3-8.3 8.3Z"/><path d="m5.87 14.883 5.605-2.735a1.47 1.47 0 0 0 .683-.673l2.725-5.596c.312-.664-.166-1.182-.85-.84L8.447 7.764c-.302.136-.508.341-.674.673L5.03 14.043c-.312.645.196 1.152.84.84m4.09-3.72A1.19 1.19 0 0 1 8.77 9.97c0-.664.527-1.201 1.19-1.201a1.2 1.2 0 0 1 1.202 1.2c0 .655-.537 1.192-1.201 1.192Z"/></g>
                                </svg>
                            </span>
                            <span class="step-text"><span class="copy-link-action">${linkCopied? msg('Open Copied Link in Safari') : msg('Tap here to Copy App Link')}</span></span>
                        </a>`: ''}
                        ${!isDesktop && !Utils.isAppleMobileNonSafari() && !Utils.isIPad() && isApple26Plus? html`
                        <div class="description-step">
                            <div class="svg-wrap">
                                <svg id="safari-dots" width="22" height="24" viewBox="0 0 24 24">
                                    <circle cx="2" cy="12" r="2" fill="currentColor"/>
                                    <circle cx="12" cy="12" r="2" fill="currentColor"/>
                                    <circle cx="22" cy="12" r="2" fill="currentColor"/>
                                </svg>
                            </div>
                            <div class="step-text">${msg('Press More if no Share icon')}</div>
                        </div>`: ''}
                        <div class="description-step">
                            <div class="svg-wrap">
                                <svg id="pwa-share" width="25" height="32" viewBox="0 0 17.695 26.475">
                                    <g fill="currentColor"><path d="M17.334 10.762v9.746c0 2.012-1.025 3.027-3.066 3.027H3.066C1.026 23.535 0 22.52 0 20.508v-9.746C0 8.75 1.025 7.734 3.066 7.734h2.94v1.573h-2.92c-.977 0-1.514.527-1.514 1.543v9.57c0 1.015.537 1.543 1.514 1.543h11.152c.967 0 1.524-.527 1.524-1.543v-9.57c0-1.016-.557-1.543-1.524-1.543h-2.91V7.734h2.94c2.04 0 3.066 1.016 3.066 3.028Z"/><path d="M8.662 15.889c.42 0 .781-.352.781-.762V5.097l-.058-1.464.654.693 1.484 1.582a.698.698 0 0 0 .528.235c.4 0 .713-.293.713-.694 0-.205-.088-.361-.235-.508l-3.3-3.183c-.196-.196-.362-.264-.567-.264-.195 0-.361.069-.566.264L4.795 4.94a.681.681 0 0 0-.225.508c0 .4.293.694.703.694.186 0 .4-.079.538-.235l1.474-1.582.664-.693-.058 1.465v10.029c0 .41.351.762.771.762Z"/></g>
                                </svg>
                            </div>
                            <div class="step-text">${msg('Press Share in Navigation bar')}</div>
                        </div>
                        ${!isDesktop && isApple26Plus? html`
                        <div class="description-step">
                            <div class="svg-wrap">
                                <svg id="safari-chevron" viewBox="0 0 16.961 10.395"><path d="M8.485 10.395a.87.87 0 0 0 .657-.286l7.556-7.735a.88.88 0 0 0 .263-.628c0-.507-.381-.899-.889-.899a.97.97 0 0 0-.64.26L7.958 8.74h1.045L1.527 1.106A.92.92 0 0 0 .899.847c-.51 0-.899.392-.899.9 0 .25.102.464.265.63L7.83 10.11q.268.284.655.284"/></svg>
                            </div>
                            <div class="step-text">${msg('Press "View More" in Share menu')}</div>
                        </div>`: ''}
                        <div class="description-step">
                            <div class="svg-wrap">
                                ${isDesktop? 
                                html`<svg id="pwa-add" viewBox="0 0 23.389 17.979" width="25" height="25">
                                    <g fill="currentColor"><path d="M1.045 3.291v1.377h20.937V3.291Zm2.021 14.688h16.895c2.05 0 3.066-1.006 3.066-3.018V3.027C23.027 1.016 22.012 0 19.961 0H3.066C1.026 0 0 1.016 0 3.027v11.934c0 2.012 1.025 3.018 3.066 3.018Zm.02-1.573c-.977 0-1.514-.517-1.514-1.533V3.115c0-1.015.537-1.543 1.514-1.543H19.94c.967 0 1.514.528 1.514 1.543v11.758c0 1.016-.547 1.533-1.514 1.533Z"/><path d="M4.2 14.014c0 .508.35.85.868.85h12.92c.518 0 .87-.343.87-.85v-1.465c0-.508-.352-.85-.87-.85H5.068c-.517 0-.869.342-.869.85Z"/></g>
                                </svg>`: 
                                html`<svg id="pwa-add" width="25" height="25">
                                    <g><path d="m23.40492,1.60784c-1.32504,-1.32504 -3.19052,-1.56912 -5.59644,-1.56912l-10.65243,0c-2.33622,0 -4.2017,0.24408 -5.5267,1.56912c-1.32504,1.34243 -1.56911,3.17306 -1.56911,5.50924l0,10.5827c0,2.40596 0.22665,4.254 1.55165,5.57902c1.34246,1.32501 3.19052,1.5691 5.59647,1.5691l10.60013,0c2.40592,0 4.2714,-0.24408 5.59644,-1.5691c1.325,-1.34245 1.55166,-3.17306 1.55166,-5.57902l0,-10.51293c0,-2.40596 -0.22666,-4.25401 -1.55166,-5.57901zm-0.38355,5.21289l0,11.24518c0,1.51681 -0.20924,2.94643 -1.02865,3.78327c-0.83683,0.83685 -2.30134,1.0635 -3.81815,1.0635l-11.33234,0c-1.51681,0 -2.96386,-0.22665 -3.80073,-1.0635c-0.83683,-0.83684 -1.04607,-2.26646 -1.04607,-3.78327l0,-11.19288c0,-1.5517 0.20924,-3.01617 1.02865,-3.85304c0.83687,-0.83683 2.31876,-1.04607 3.87042,-1.04607l11.28007,0c1.51681,0 2.98132,0.22666 3.81815,1.06353c0.81941,0.81941 1.02865,2.26645 1.02865,3.78327zm-10.53039,12.08205c0.64506,0 1.02861,-0.43586 1.02861,-1.13326l0,-4.34117l4.53294,0c0.66252,0 1.13326,-0.36613 1.13326,-0.99376c0,-0.64506 -0.43586,-1.02861 -1.13326,-1.02861l-4.53294,0l0,-4.53294c0,-0.6974 -0.38355,-1.13326 -1.02861,-1.13326c-0.62763,0 -0.99376,0.45332 -0.99376,1.13326l0,4.53294l-4.51552,0c-0.69737,0 -1.15069,0.38355 -1.15069,1.02861c0,0.62763 0.48817,0.99376 1.15069,0.99376l4.51552,0l0,4.34117c0,0.66252 0.36613,1.13326 0.99376,1.13326z" /></g>
                                </svg>`
                                }
                            </div>
                            <div class="step-text">
                                ${isDesktop? msg('Press "Add to Dock"'): msg('Press "Add to Home Screen"')}
                            </div>
                        </div>
                    </div>
                </div>
                ${screenshotsAvailable && installAvailable? html`<pwa-gallery .screenshots=${manifest.screenshots} .theme="${isDesktop? 'apple_desktop': 'apple_mobile'}" .rtl="${isRTL}"></pwa-gallery>`: ''}
                <div class="action-buttons">
                    ${screenshotsAvailable? html`<button class="dialog-button button gallery" @click=${toggleGallery} ontouchstart="">
                    <span class="button-text">
                            ${galleryRequested? html`<span>${msg('Back')}</span>
                            <svg id="icon-back" viewBox="0 0 12.038 16.957"><path fill="currentColor" fill-opacity=".85" d="M0 8.472c0 .245.1.46.278.647l7.739 7.564c.163.174.39.261.64.261.505 0 .889-.379.889-.889a.91.91 0 0 0-.26-.636L2.19 8.472l7.097-6.947a.93.93 0 0 0 .259-.636.87.87 0 0 0-.89-.889.86.86 0 0 0-.64.261L.279 7.826A.92.92 0 0 0 0 8.472"/></svg>`
                    :
                            html`
                            <span>${msg('Show Gallery')}</span>
                            <svg id="pwa-gallery" width="26" height="26" viewBox="0 0 23.538 18.022"><path d="M2.79 18.022h17.958c1.834 0 2.79-.969 2.79-2.778V2.791C23.538.969 22.582 0 20.748 0H2.791C.956 0 0 .956 0 2.79v12.454c0 1.835.956 2.778 2.79 2.778zM.879 2.83C.878 1.55 1.55.88 2.816.88h17.906c1.228 0 1.938.671 1.938 1.95v12.067L16.756 9.47c-.517-.414-.995-.685-1.615-.685-.607 0-1.085.22-1.576.672L8.927 13.59l-1.938-1.796c-.426-.387-.853-.607-1.382-.607-.504 0-.879.207-1.305.594L.878 14.986zm6.46 6.356a2.39 2.39 0 002.377-2.39c0-1.304-1.072-2.39-2.377-2.39a2.401 2.401 0 00-2.39 2.39 2.393 2.393 0 002.39 2.39z"/>
                            </svg>`}
                        </span>
                        
                    </button>`:''}
                    <button class="dialog-button button install" @click=${howToForApple} ontouchstart="">
                        <span class="button-text ${howToRequested? 'show': 'hide'}">
                            <span>${msg('Back')}</span>
                            <svg id="icon-back" viewBox="0 0 12.038 16.957"><path fill="currentColor" fill-opacity=".85" d="M0 8.472c0 .245.1.46.278.647l7.739 7.564c.163.174.39.261.64.261.505 0 .889-.379.889-.889a.91.91 0 0 0-.26-.636L2.19 8.472l7.097-6.947a.93.93 0 0 0 .259-.636.87.87 0 0 0-.89-.889.86.86 0 0 0-.64.261L.279 7.826A.92.92 0 0 0 0 8.472"/></svg>
                        </span>
                        <span class="button-text ${howToRequested? 'hide': 'show'}">
                            <span>${isDesktop? msg('Add to Dock'): msg('Add to Home Screen')}</span>
                            <svg viewBox="0 0 25 25">
                                <use href="#pwa-add"></use>
                            </svg>
                        </span>
                    </button>
                </div>
            </article>
        </aside>`;
};
export default template;
