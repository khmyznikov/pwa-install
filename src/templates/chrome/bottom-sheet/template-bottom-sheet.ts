import { html } from 'lit';
import { msg } from '@lit/localize';

const template = (name: string, description: string, icon: string, install: any) => {
    return html`
        <div class="touch-header" id="touch-header"></div>
        <div class="body-header">
            <div class="icon">
                <img src="${icon}" alt="icon" class="icon-image">
            </div>
            <div class="about">
                <div class="name">
                    <label>${name}</label>
                </div>
                <div class="hostname">${location.hostname}</div>
            </div>
            <button class="material-button primary install" @click='${install}'>${msg('Install')}</button>
        </div>
        ${description ? html `<div class="description">${description}</div>`: ''}
    `;
};
export default template;
