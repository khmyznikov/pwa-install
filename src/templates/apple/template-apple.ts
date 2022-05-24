import { html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { IManifest } from '../../types/types';
import { msg } from '@lit/localize';

const template = (name: string, description: string, installDescription: string, disableDescription: boolean, icon: string, manifest: IManifest, installAvailable: any, hideDialog: any, howToForApple: any, howToRequested: boolean, toggleGallery: any, galleryRequested: boolean) => {
    const installDialogClassesApple = () => { return {available: installAvailable, 'how-to': howToRequested, gallery: galleryRequested }};

    return html`
        <aside id="pwa-install-element">
            <article class="install-dialog apple ${classMap(installDialogClassesApple())} dialog-body">
                <div class="icon">
                    <img src="${icon}" alt="icon" class="icon-image">
                </div>
                <div class="about">
                    <div class="name">
                        ${name}
                        <button type="button" class="close" @click='${hideDialog}'>
                            <svg viewBox="0 0 24 24"><path d="M5.3 18.7c.2.2.4.3.7.3s.5-.1.7-.3l5.3-5.3 5.3 5.3a1.08 1.08 0 0 0 .7.3 1.08 1.08 0 0 0 .7-.3c.4-.4.4-1 0-1.4L13.4 12l5.3-5.3c.4-.4.4-1 0-1.4s-1-.4-1.4 0L12 10.6 6.7 5.3c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l5.3 5.3-5.3 5.3c-.4.4-.4 1 0 1.4z"/></svg>
                        </button>
                    </div>
                    <div class="description">${description || location.hostname}</div>
                </div>
                ${!disableDescription? html`<div class="welcome-to-install">
                    ${installDescription? installDescription: msg('This site has app functionality. Add it to your Home Screen for extensive experience and easy access.')}</div>` 
                : '' }
                <div class="how-to-body">
                    <div class="how-to-description">
                    
                        <div class="description-step">
                            <div class="svg-wrap">
                                <!-- <span class="step-count">1</span> -->
                                <svg id="pwa-safari" viewBox="0 0 13.964 13.964" width="24" height="24">
                                    <path d="M6.982 0A6.99 6.99 0 000 6.982a6.99 6.99 0 006.982 6.982 6.99 6.99 0 006.982-6.982A6.99 6.99 0 006.982 0zm0 1.074a5.9 5.9 0 015.908 5.908 5.9 5.9 0 01-5.908 5.908 5.9 5.9 0 01-5.908-5.908 5.9 5.9 0 015.908-5.908zm3.76 2.148L5.6 5.624l-2.379 5.117 5.165-2.354zM6.963 6.288a.795.795 0 11-.001 1.59.795.795 0 010-1.59z" font-weight="400" font-family="sans-serif" overflow="visible"/>
                                </svg>
                            </div>
                            <div class="step-text">${msg('1) Open in Safari browser')}</div>
                        </div>
                        <div class="description-step">
                            <div class="svg-wrap">
                                <!-- <span class="step-count">2</span> -->
                                <svg id="pwa-share" width="25" height="32">
                                    <g><path d="m12.51122,20.7648c0.52277,0 0.99149,-0.43265 0.99149,-0.95542l0,-14.87204l-0.09015,-2.0731l1.11768,1.15371l2.27135,2.37952c0.18028,0.19833 0.43265,0.30647 0.68502,0.30647c0.50476,0 0.90134,-0.37857 0.90134,-0.88332c0,-0.27039 -0.10817,-0.46869 -0.28844,-0.64895l-4.86721,-4.74103c-0.25237,-0.25237 -0.46869,-0.32448 -0.72106,-0.32448c-0.25237,0 -0.46869,0.0721 -0.72106,0.32448l-4.88523,4.74103c-0.18028,0.18028 -0.28844,0.37857 -0.28844,0.64895c0,0.50476 0.37857,0.88332 0.90134,0.88332c0.23436,0 0.50476,-0.10814 0.68502,-0.30647l2.27135,-2.37952l1.11768,-1.17172l-0.0721,2.09112l0,14.87204c0,0.52277 0.45066,0.95542 0.99145,0.95542l-0.00002,0l-0.00001,-0.00001zm-8.13005,10.96022l16.22403,0c2.86626,0 4.30841,-1.42412 4.30841,-4.23627l0,-14.27715c0,-2.79415 -1.44215,-4.23627 -4.30841,-4.23627l-3.96589,0l0,2.00095l3.92985,0c1.47819,0 2.34345,0.79316 2.34345,2.34345l0,14.06085c0,1.5503 -0.86527,2.34347 -2.34345,2.34347l-16.15194,0c-1.49625,0 -2.32547,-0.79317 -2.32547,-2.34347l0,-14.06085c0,-1.55029 0.82923,-2.34345 2.32547,-2.34345l3.96589,0l0,-2.00095l-4.00196,0c-2.84821,0 -4.29035,1.4241 -4.29035,4.23627l0,14.27715c0,2.81217 1.44215,4.23627 4.29035,4.23627l0.00001,0l0.00001,0z" /></g>
                                </svg>
                            </div>
                            <div class="step-text">${msg('2) Press Share in Navigation bar')}</div>
                        </div>
                        <div class="description-step">
                            <div class="svg-wrap">
                                <!-- <span class="step-count">3</span> -->
                                <svg id="pwa-add" width="25" height="25">
                                    <g><path d="m23.40492,1.60784c-1.32504,-1.32504 -3.19052,-1.56912 -5.59644,-1.56912l-10.65243,0c-2.33622,0 -4.2017,0.24408 -5.5267,1.56912c-1.32504,1.34243 -1.56911,3.17306 -1.56911,5.50924l0,10.5827c0,2.40596 0.22665,4.254 1.55165,5.57902c1.34246,1.32501 3.19052,1.5691 5.59647,1.5691l10.60013,0c2.40592,0 4.2714,-0.24408 5.59644,-1.5691c1.325,-1.34245 1.55166,-3.17306 1.55166,-5.57902l0,-10.51293c0,-2.40596 -0.22666,-4.25401 -1.55166,-5.57901zm-0.38355,5.21289l0,11.24518c0,1.51681 -0.20924,2.94643 -1.02865,3.78327c-0.83683,0.83685 -2.30134,1.0635 -3.81815,1.0635l-11.33234,0c-1.51681,0 -2.96386,-0.22665 -3.80073,-1.0635c-0.83683,-0.83684 -1.04607,-2.26646 -1.04607,-3.78327l0,-11.19288c0,-1.5517 0.20924,-3.01617 1.02865,-3.85304c0.83687,-0.83683 2.31876,-1.04607 3.87042,-1.04607l11.28007,0c1.51681,0 2.98132,0.22666 3.81815,1.06353c0.81941,0.81941 1.02865,2.26645 1.02865,3.78327zm-10.53039,12.08205c0.64506,0 1.02861,-0.43586 1.02861,-1.13326l0,-4.34117l4.53294,0c0.66252,0 1.13326,-0.36613 1.13326,-0.99376c0,-0.64506 -0.43586,-1.02861 -1.13326,-1.02861l-4.53294,0l0,-4.53294c0,-0.6974 -0.38355,-1.13326 -1.02861,-1.13326c-0.62763,0 -0.99376,0.45332 -0.99376,1.13326l0,4.53294l-4.51552,0c-0.69737,0 -1.15069,0.38355 -1.15069,1.02861c0,0.62763 0.48817,0.99376 1.15069,0.99376l4.51552,0l0,4.34117c0,0.66252 0.36613,1.13326 0.99376,1.13326z" /></g>
                                </svg>
                            </div>
                            <div class="step-text">${msg('3) Press Add to Home Screen')}</div>
                        </div>
                    </div>
                </div>
                ${manifest.screenshots && manifest.screenshots.length? html`<pwa-gallery .screenshots=${manifest.screenshots}></pwa-gallery>`: ''}
                <div class="action-buttons">
                    ${manifest.screenshots && manifest.screenshots.length? html`<button class="dialog-button button gallery" @click=${toggleGallery}>
                        <svg id="pwa-gallery" width="26" height="26" viewBox="0 0 23.538 18.022"><path d="M2.79 18.022h17.958c1.834 0 2.79-.969 2.79-2.778V2.791C23.538.969 22.582 0 20.748 0H2.791C.956 0 0 .956 0 2.79v12.454c0 1.835.956 2.778 2.79 2.778zM.879 2.83C.878 1.55 1.55.88 2.816.88h17.906c1.228 0 1.938.671 1.938 1.95v12.067L16.756 9.47c-.517-.414-.995-.685-1.615-.685-.607 0-1.085.22-1.576.672L8.927 13.59l-1.938-1.796c-.426-.387-.853-.607-1.382-.607-.504 0-.879.207-1.305.594L.878 14.986zm6.46 6.356a2.39 2.39 0 002.377-2.39c0-1.304-1.072-2.39-2.377-2.39a2.401 2.401 0 00-2.39 2.39 2.393 2.393 0 002.39 2.39z"/></svg>
                    </button>`:''}
                    <button class="dialog-button button install" @click=${howToForApple}>
                        <span class="button-text ${howToRequested? 'show': 'hide'}">${msg('Hide Instruction')}</span>
                        <span class="button-text ${howToRequested? 'hide': 'show'}">
                            <span>${msg('Add to Home Screen')}</span>
                            <svg width="25" height="25">
                                <use href="#pwa-add"></use>
                            </svg>
                        </span>
                    </button>
                </div>
            </article>
        </aside>`;
};
export default template;