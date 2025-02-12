import { html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { WebAppManifest } from 'web-app-manifest';
import { msg } from '@lit/localize';

const template = (name: string, description: string, installDescription: string, disableDescription: boolean, disableScreenshots: boolean, disableClose: boolean, icon: string, manifest: WebAppManifest, installAvailable: any, hideDialog: any, howToForApple: any, isDesktop: boolean, howToRequested: boolean, toggleGallery: any, galleryRequested: boolean, isRTL: boolean = false) => {
    const installDialogClassesApple = () => { return {available: installAvailable, 'how-to': howToRequested, gallery: galleryRequested, desktop: isDesktop}};
    const screenshotsAvailable = !disableScreenshots && manifest.screenshots && manifest.screenshots.length;

    return html`
        <aside id="pwa-install-element" dir="${isRTL ? 'rtl' : 'ltr'}">
            <article class="install-dialog apple ${classMap(installDialogClassesApple())} dialog-body">
                <div class="icon">
                    <img src="${icon}" alt="icon" class="icon-image" draggable="false">
                </div>
                ${!disableClose? html`<button type="button" title="close" class="close" @click='${hideDialog}'>
                    <svg viewBox="0 0 24 24"><path d="M5.3 18.7c.2.2.4.3.7.3s.5-.1.7-.3l5.3-5.3 5.3 5.3a1.08 1.08 0 0 0 .7.3 1.08 1.08 0 0 0 .7-.3c.4-.4.4-1 0-1.4L13.4 12l5.3-5.3c.4-.4.4-1 0-1.4s-1-.4-1.4 0L12 10.6 6.7 5.3c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l5.3 5.3-5.3 5.3c-.4.4-.4 1 0 1.4z"/></svg>
                </button>` : ''}
                <div class="about">
                    <div class="name">
                        ${name}
                    </div>
                    <div class="description">${description || location.hostname}</div>
                </div>
                ${!disableDescription? html`<div class="welcome-to-install">
                    ${installDescription? installDescription: `${msg('This site has app functionality.')} ${isDesktop? msg('Add it to your Dock for extensive experience and easy access.') : msg('Add it to your Home Screen for extensive experience and easy access.')}`}</div>` 
                : '' }
                <div class="how-to-body">
                    <div class="how-to-description">

                        ${!isDesktop? html`
                        <div class="description-step">
                            <div class="svg-wrap">
                                <svg id="pwa-safari" viewBox="0 0 20.283 19.932" width="24" height="24">
                                    <g fill="currentColor"><path d="M9.96 19.922c5.45 0 9.962-4.522 9.962-9.961C19.922 4.51 15.4 0 9.952 0 4.511 0 0 4.512 0 9.96c0 5.44 4.521 9.962 9.96 9.962Zm0-1.66A8.26 8.26 0 0 1 1.67 9.96c0-4.61 3.672-8.3 8.281-8.3 4.61 0 8.31 3.69 8.31 8.3 0 4.61-3.69 8.3-8.3 8.3Z"/><path d="m5.87 14.883 5.605-2.735a1.47 1.47 0 0 0 .683-.673l2.725-5.596c.312-.664-.166-1.182-.85-.84L8.447 7.764c-.302.136-.508.341-.674.673L5.03 14.043c-.312.645.196 1.152.84.84Zm4.09-3.72A1.19 1.19 0 0 1 8.77 9.97c0-.664.527-1.201 1.19-1.201a1.2 1.2 0 0 1 1.202 1.2c0 .655-.537 1.192-1.201 1.192Z"/></g>
                                </svg>
                            </div>
                            <div class="step-text">${msg('1) Open in your main browser')}</div>
                        </div>`: ''}
                        <div class="description-step">
                            <div class="svg-wrap">
                                <svg id="pwa-share" width="25" height="32" viewBox="0 0 17.695 26.475">
                                    <g fill="currentColor"><path d="M17.334 10.762v9.746c0 2.012-1.025 3.027-3.066 3.027H3.066C1.026 23.535 0 22.52 0 20.508v-9.746C0 8.75 1.025 7.734 3.066 7.734h2.94v1.573h-2.92c-.977 0-1.514.527-1.514 1.543v9.57c0 1.015.537 1.543 1.514 1.543h11.152c.967 0 1.524-.527 1.524-1.543v-9.57c0-1.016-.557-1.543-1.524-1.543h-2.91V7.734h2.94c2.04 0 3.066 1.016 3.066 3.028Z"/><path d="M8.662 15.889c.42 0 .781-.352.781-.762V5.097l-.058-1.464.654.693 1.484 1.582a.698.698 0 0 0 .528.235c.4 0 .713-.293.713-.694 0-.205-.088-.361-.235-.508l-3.3-3.183c-.196-.196-.362-.264-.567-.264-.195 0-.361.069-.566.264L4.795 4.94a.681.681 0 0 0-.225.508c0 .4.293.694.703.694.186 0 .4-.079.538-.235l1.474-1.582.664-.693-.058 1.465v10.029c0 .41.351.762.771.762Z"/></g>
                                </svg>
                            </div>
                            <div class="step-text">${msg('2) Press Share in Navigation bar').replace(isDesktop? '2)': '0)', '1)')}</div>
                        </div>
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
                            <div class="step-text">${isDesktop? msg('2) Press Add to Dock'): msg('3) Scroll down to "Add to Home Screen"')}</div>
                        </div>
                    </div>
                </div>
                ${screenshotsAvailable && manifest.screenshots? html`<pwa-gallery .screenshots=${manifest.screenshots} .theme="${isDesktop? 'apple_desktop': 'apple_mobile'}" .rtl="${isRTL}"></pwa-gallery>`: ''}
                <div class="action-buttons">
                    ${screenshotsAvailable? html`<button class="dialog-button button gallery" @click=${toggleGallery}>
                        ${isDesktop? 
                            html`<svg id="pwa-gallery" viewBox="0 0 10 6"><path d="m1.102 2.21 3.169 3.24c.22.222.462.333.729.333a.94.94 0 0 0 .378-.083 1.19 1.19 0 0 0 .347-.25L8.89 2.21a.8.8 0 0 0 .246-.593.838.838 0 0 0-.118-.44.884.884 0 0 0-.312-.311.84.84 0 0 0-1.063.167L4.854 3.92h.299L2.359 1.033a.868.868 0 0 0-.642-.286.822.822 0 0 0-.43.119.935.935 0 0 0-.312.312.863.863 0 0 0-.115.44c0 .116.02.223.057.32a.898.898 0 0 0 .185.272Z"/>
                                </svg>`:
                            html`<svg id="pwa-gallery" width="26" height="26" viewBox="0 0 23.538 18.022"><path d="M2.79 18.022h17.958c1.834 0 2.79-.969 2.79-2.778V2.791C23.538.969 22.582 0 20.748 0H2.791C.956 0 0 .956 0 2.79v12.454c0 1.835.956 2.778 2.79 2.778zM.879 2.83C.878 1.55 1.55.88 2.816.88h17.906c1.228 0 1.938.671 1.938 1.95v12.067L16.756 9.47c-.517-.414-.995-.685-1.615-.685-.607 0-1.085.22-1.576.672L8.927 13.59l-1.938-1.796c-.426-.387-.853-.607-1.382-.607-.504 0-.879.207-1.305.594L.878 14.986zm6.46 6.356a2.39 2.39 0 002.377-2.39c0-1.304-1.072-2.39-2.377-2.39a2.401 2.401 0 00-2.39 2.39 2.393 2.393 0 002.39 2.39z"/>
                                </svg>`
                        }
                    </button>`:''}
                    <button class="dialog-button button install" @click=${howToForApple}>
                        <span class="button-text ${howToRequested? 'show': 'hide'}">${msg('Hide Instruction')}</span>
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
