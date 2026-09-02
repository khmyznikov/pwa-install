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
    customStyles
}: AppleTemplateOptions) => {
    const screenshotsAvailable = !disableScreenshots && manifest.screenshots && manifest.screenshots.length;
    const installDialogClassesApple = () => { return {available: installAvailable, aqua: isApple26Plus, 'how-to': howToRequested, 'how-to-manual': manualHowTo, gallery: galleryRequested, desktop: isDesktop, "apple-mobile": !isDesktop}; };
    let styles = { '--tint-color': Utils.getPageBackgroundColor(), ...customStyles };
    const currentUrl = location.href;
    const safariUrl = currentUrl.replace(/^https?:/, 'x-safari-https:');
    const copyCurrentUrl = (event: MouseEvent) => {
        const link = event.currentTarget as HTMLAnchorElement;
        link.classList.add('copied');
        const action = link.querySelector('.copy-link-action');
        if (action)
            action.textContent = msg('Open in Safari');
        void Utils.copyTextToClipboard(currentUrl);
    };

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
                    <div class="how-to-description">
                        ${!isDesktop && (Utils.isInAppBrowser() || !Utils.isServiceWorkerSupported())? html`
                        <a class="description-step copy-link" href=${safariUrl} @click=${copyCurrentUrl}>
                            <span class="svg-wrap" aria-hidden="true">
                                <svg id="pwa-copy-document" viewBox="0 0 19.9665 24.5911" width="24" height="24">
                                    <path d="M14.0596 0.974571L18.992 5.98767C19.7198 6.73835 19.9665 7.5053 19.9665 8.69895L19.9665 16.6214C19.9665 18.6574 18.9494 19.685 16.934 19.685L15.2335 19.685L15.2335 18.1143L16.8573 18.1143C17.8637 18.1143 18.3855 17.5717 18.3855 16.5965L18.3855 8.24925L13.817 8.24925C12.7047 8.24925 12.1528 7.7079 12.1528 6.57475L12.1528 1.57069L7.84226 1.57069C6.82559 1.57069 6.30374 2.12169 6.30374 3.08851L6.30374 4.87293L4.73305 4.87293L4.73305 3.06359C4.73305 1.02753 5.74409 0 7.75523 0L11.5036 0C12.5544 0 13.3628 0.257059 14.0596 0.974571ZM13.5683 6.34915C13.5683 6.69443 13.7055 6.83382 14.0508 6.83382L17.9789 6.83382L13.5683 2.33825Z"/>
                                    <path d="M0 21.4943C0 23.5407 1.00683 24.5579 3.02218 24.5579L12.201 24.5579C14.2163 24.5579 15.2335 23.5325 15.2335 21.4943L15.2335 13.8737C15.2335 12.6171 15.0882 12.0779 14.3086 11.2775L8.91993 5.79786C8.18172 5.03895 7.57214 4.87293 6.46874 4.87293L3.02218 4.87293C1.01105 4.87293 0 5.90046 0 7.93652ZM1.57069 21.4694L1.57069 7.96144C1.57069 6.99462 2.09254 6.44363 3.10921 6.44363L6.30895 6.44363L6.30895 12.105C6.30895 13.3417 6.9335 13.9432 8.14714 13.9432L13.6525 13.9432L13.6525 21.4694C13.6525 22.4447 13.1306 22.9872 12.1243 22.9872L3.09886 22.9872C2.09254 22.9872 1.57069 22.4447 1.57069 21.4694ZM8.32733 12.476C7.93833 12.476 7.77613 12.3138 7.77613 11.9248L7.77613 6.79886L13.3498 12.476Z"/>
                                </svg>
                                <svg id="pwa-safari" viewBox="0 0 20.283 19.932" width="24" height="26">
                                    <g fill="currentColor"><path d="M9.96 19.922c5.45 0 9.962-4.522 9.962-9.961C19.922 4.51 15.4 0 9.952 0 4.511 0 0 4.512 0 9.96c0 5.44 4.521 9.962 9.96 9.962Zm0-1.66A8.26 8.26 0 0 1 1.67 9.96c0-4.61 3.672-8.3 8.281-8.3 4.61 0 8.31 3.69 8.31 8.3 0 4.61-3.69 8.3-8.3 8.3Z"/><path d="m5.87 14.883 5.605-2.735a1.47 1.47 0 0 0 .683-.673l2.725-5.596c.312-.664-.166-1.182-.85-.84L8.447 7.764c-.302.136-.508.341-.674.673L5.03 14.043c-.312.645.196 1.152.84.84Zm4.09-3.72A1.19 1.19 0 0 1 8.77 9.97c0-.664.527-1.201 1.19-1.201a1.2 1.2 0 0 1 1.202 1.2c0 .655-.537 1.192-1.201 1.192Z"/></g>
                                </svg>
                            </span>
                            <span class="step-text"><span class="copy-link-action">${msg('Tap here to Copy App link')}</span></span>
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
                        ${!isDesktop? html`
                        <div class="description-step">
                            <div class="svg-wrap">
                                <svg id="safari-chevron" viewBox="0 0 16.961 10.3951"><path d="M8.4846 10.3951C8.73131 10.3951 8.97169 10.2996 9.14172 10.1089L16.6978 2.37423C16.8615 2.20842 16.961 1.99718 16.961 1.74646C16.961 1.23887 16.5797 0.847251 16.0721 0.847251C15.8338 0.847251 15.5956 0.952868 15.4319 1.10622L7.95803 8.74005L9.00294 8.74005L1.52698 1.10622C1.36539 0.952868 1.14571 0.847251 0.899205 0.847251C0.389508 0.847251 0 1.23887 0 1.74646C0 1.99718 0.101597 2.21053 0.265299 2.37634L7.8296 10.111C8.00787 10.3017 8.22754 10.3951 8.4846 10.3951Z"/></svg>
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
                                ${isDesktop? msg('Press Add to Dock'): msg('Press "Add to Home Screen"')}
                            </div>
                        </div>
                    </div>
                </div>
                ${screenshotsAvailable && installAvailable? html`<pwa-gallery .screenshots=${manifest.screenshots} .theme="${isDesktop? 'apple_desktop': 'apple_mobile'}" .rtl="${isRTL}"></pwa-gallery>`: ''}
                <div class="action-buttons">
                    ${screenshotsAvailable? html`<button class="dialog-button button gallery" @click=${toggleGallery} ontouchstart="">
                    <span class="button-text">
                            ${galleryRequested? html`<span>${msg('Back')}</span>
                    <svg id="icon-back" viewBox="0 0 12.0379 16.9567"><path d="M0 8.47214C0 8.71674 0.0994872 8.9322 0.27776 9.11871L8.0166 16.6832C8.18031 16.8573 8.40611 16.9443 8.65684 16.9443C9.16232 16.9443 9.54569 16.5651 9.54569 16.0554C9.54569 15.8068 9.44832 15.5914 9.28672 15.4194L2.19003 8.47214L9.28672 1.52487C9.44832 1.35293 9.54569 1.12712 9.54569 0.888854C9.54569 0.379157 9.16232 0 8.65684 0C8.40611 0 8.18031 0.0870263 8.0166 0.261079L0.27776 7.82558C0.0994872 8.01209 0 8.22754 0 8.47214Z" fill="currentColor" fill-opacity="0.85"/>`
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
                            <svg id="icon-back" viewBox="0 0 12.0379 16.9567"><path d="M0 8.47214C0 8.71674 0.0994872 8.9322 0.27776 9.11871L8.0166 16.6832C8.18031 16.8573 8.40611 16.9443 8.65684 16.9443C9.16232 16.9443 9.54569 16.5651 9.54569 16.0554C9.54569 15.8068 9.44832 15.5914 9.28672 15.4194L2.19003 8.47214L9.28672 1.52487C9.44832 1.35293 9.54569 1.12712 9.54569 0.888854C9.54569 0.379157 9.16232 0 8.65684 0C8.40611 0 8.18031 0.0870263 8.0166 0.261079L0.27776 7.82558C0.0994872 8.01209 0 8.22754 0 8.47214Z" fill="currentColor" fill-opacity="0.85"/>
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
