import { html } from 'lit';
import { msg } from '@lit/localize';
import { classMap } from 'lit/directives/class-map.js';

const fallbackClass = (isAndroidFallback: boolean = false, howToRequested: boolean = false) => {
    return {fallback: isAndroidFallback, 'how-to': howToRequested};
}

const template = (name: string, description: string, icon: string, install: any, fallback?: boolean, howToRequested?: boolean) => {
    return html`
    <div class="dialog-body ${classMap(fallbackClass(fallback, howToRequested))}">
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
        <div class="how-to-body">
            <div class="description-step">
                ${msg('1) tap your browser three dots menu')}
            </div>
            <div class="description-step">
                ${msg('2) tap on "Add to Home screen"')}
            </div>
        </div>
        ${description ? html `<div class="description">${description}</div>`: ''}
        <slot></slot>
    </div>
    `;
};
export default template;
