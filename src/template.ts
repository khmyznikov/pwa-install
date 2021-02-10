import { html, LitElement } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';
import { IManifest } from './types';

const template = (name: string, description: string, icon: string, manifest: IManifest, installAvailable: any, hideDialog: any, install: any) => {
    const installDialogClasses = () => { return {available: installAvailable }};

    return html`
        <div id="pwa-install">
            <div class="install-dialog chrome ${classMap(installDialogClasses())}">
                <div class="dialog-body">
                    <div class="icon">
                        <img src="${icon}" alt="icon" class="icon-image">
                    </div>
                    <div class="about">
                        <div class="name">
                            ${name}
                            <button class="material-button secondary close" @click='${hideDialog}'>&#10005;</button>
                        </div>
                        <div class="description">${description}</div>
                    </div>
                    ${manifest.screenshots? html`<pwa-gallery .screenshots=${manifest.screenshots}></pwa-gallery>`: ''}
                    <div class="action-buttons">
                        <button class="material-button secondary">More</button>
                        <button class="material-button primary install" @click='${install}'>Install</button>
                    </div>
                </div>
            </div>
        </div>`;
};
export default template;