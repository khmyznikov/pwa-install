import { html } from 'lit';
import { msg } from '@lit/localize';
import { classMap } from 'lit/directives/class-map.js';

const fallbackClass = (isAndroidFallback: boolean = false) => {
    return {fallback: isAndroidFallback};
}
let instruction = '';
const template = (name: string, description: string, icon: string, install: any, fallback?: boolean) => {
    return html`
    <div class="dialog-body ${classMap(fallbackClass(fallback))}">
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
        <slot></slot>
    </div>
    `;
};
export default template;
