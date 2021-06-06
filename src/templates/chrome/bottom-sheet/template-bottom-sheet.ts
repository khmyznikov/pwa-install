import { html } from 'lit';
import { IManifest } from '../../../types/types';

const template = (name: string, description: string, icon: string, install: any) => {
    return html`
        <div class="dialog-body">
            <div class="touch-header" id="touch-header"></div>
            <div class="body-header">
                <div class="icon">
                    <img src="${icon}" alt="icon" class="icon-image">
                </div>
                <div class="about">
                    <div class="name">
                        ${name}
                    </div>
                    <div class="hostname">${location.hostname}</div>
                </div>
                <button class="material-button primary install" @click='${install}'>Install</button>
            </div>
         
        </div>
    `;
};
export default template;