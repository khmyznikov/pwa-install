import { html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { WebAppManifest } from 'web-app-manifest';
import { msg } from '@lit/localize';

const template = (name: string, description: string, installDescription: string, disableDescription: boolean, icon: string, manifest: WebAppManifest, installAvailable: any, hideDialog: any, install: any, toggleGallery: any, galleryRequested: boolean) => {
    const installDialogClasses = () => { return {available: installAvailable, gallery: galleryRequested }};

    return html`
        <div id="pwa-install-element">
            <div class="install-dialog chrome ${classMap(installDialogClasses())}">
                <div class="dialog-body">
                    <div class="icon">
                        <img src="${icon}" alt="icon" class="icon-image">
                    </div>
                    <div class="about">
                        <div class="name">
                            <label>${name}</label>
                            <button class="material-button secondary close" @click='${hideDialog}'>
                                <svg viewBox="0 0 24 24"><path d="M5.3 18.7c.2.2.4.3.7.3s.5-.1.7-.3l5.3-5.3 5.3 5.3a1.08 1.08 0 0 0 .7.3 1.08 1.08 0 0 0 .7-.3c.4-.4.4-1 0-1.4L13.4 12l5.3-5.3c.4-.4.4-1 0-1.4s-1-.4-1.4 0L12 10.6 6.7 5.3c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l5.3 5.3-5.3 5.3c-.4.4-.4 1 0 1.4z"/></svg>
                            </button>
                        </div>
                        <div class="hostname">${location.hostname}</div>
                        
                    </div>
                    ${description ? html `<div class="description app-description">${description}</div>`: ''}
                    ${!disableDescription? 
                        html`<hr><div class="description install-description">${installDescription? installDescription: msg('This site has app functionality. Install it on your device for extensive experience and easy access.')}</div>` 
                        : ''}
                    ${manifest.screenshots && manifest.screenshots.length? html`<pwa-gallery .screenshots=${manifest.screenshots}></pwa-gallery>`: ''}
                    <div class="action-buttons">
                        ${manifest.screenshots && manifest.screenshots.length? html`<button class="material-button secondary" @click='${toggleGallery}'>${galleryRequested?msg('Less'):msg('More')}</button>`:''}
                        <button class="material-button primary install" @click='${install}'>${msg('Install')}</button>
                    </div>
                </div>
            </div>
            <div class="install-dialog chrome mobile ${classMap(installDialogClasses())}">
                <div class="dialog-body">
                    <pwa-bottom-sheet .props=${{name, icon, description}} .install=${install} .hideDialog=${hideDialog}>
                    </pwa-bottom-sheet>
                    ${manifest.screenshots && manifest.screenshots.length? html`<pwa-gallery .screenshots=${manifest.screenshots}></pwa-gallery>`: ''}
                </div>
            </div>
        </div>`;
};
export default template;
