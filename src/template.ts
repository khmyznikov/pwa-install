import { html } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';

const template = (name: string, description: string, icon: string, installAvailable: any, hideDialog: any, install: any) => {
    const installDialogClasses = () => { return {available: installAvailable }};

    return html`
        <div id="pwa-install">
            <div class="install-dialog chrome ${classMap(installDialogClasses())}">
                <div class="dialog-body">
                    <div class="icon">
                        <img src="${icon}" alt="icon" class="icon-image">
                    </div>
                    <div class="about">
                        <div class="name">${name}</div>
                        <div class="description">${description}</div>
                    </div>
                    <div class="action-buttons">
                        <button class="material-button secondary cancel" @click='${hideDialog}'>Hide</button>
                        <button class="material-button primary install" @click='${install}'>Install</button>
                    </div>
                </div>
            </div>
        </div>`;
};
export default template;