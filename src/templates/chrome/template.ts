import { html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { IManifest } from '../../types/types';

const template = (name: string, description: string, icon: string, manifest: IManifest, installAvailable: any, hideDialog: any, install: any, toggleGallery: any, galleryRequested: boolean) => {
    const installDialogClasses = () => { return {available: installAvailable, gallery: galleryRequested }};

    return html`
        <div id="pwa-install">
            <div class="install-dialog chrome ${classMap(installDialogClasses())}">
                <div class="dialog-body">
                    <div class="icon">
                        <img src="${icon}" alt="icon" class="icon-image">
                    </div>
                    <div class="about">
                        <div class="name">
                            <label>${name}</label>
                            <button class="material-button secondary close" @click='${hideDialog}'>&#10005;</button>
                        </div>
                        <div class="description">${description}</div>
                    </div>
                    ${manifest.screenshots && manifest.screenshots.length? html`<pwa-gallery .screenshots=${manifest.screenshots}></pwa-gallery>`: ''}
                    <div class="action-buttons">
                        ${manifest.screenshots && manifest.screenshots.length? html`<button class="material-button secondary" @click='${toggleGallery}'>${galleryRequested?'Less':'More'}</button>`:''}
                        <button class="material-button primary install" @click='${install}'>Install</button>
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