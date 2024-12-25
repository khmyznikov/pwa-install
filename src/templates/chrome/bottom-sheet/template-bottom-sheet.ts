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
            <button class="material-button primary install" @click='${install}'>
                <svg class="check-icon" height="24px" viewBox="0 -960 960 960" width="24px" fill=""><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
                <span class="button-text">${msg('Install')}</span>
            </button>
        </div>
        <div class="how-to-body">
            <div class="description-step">
                <div class="svg-wrap">
                    <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="2"/><circle cx="12" cy="5" r="2"/><circle cx="12" cy="19" r="2"/></svg>
                </div>
                <div class="step-text">${msg('1) Open your browser menu')}</div>
            </div>
            <div class="description-step">
                <div class="svg-wrap add-icon">
                    <svg viewBox="0 0 24 24"><path d="M17.5 12a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11ZM13.75 2A2.25 2.25 0 0 1 16 4.25v6.924a6.454 6.454 0 0 0-1.5.558V4.25a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0-.75.75v15.5c0 .414.336.75.75.75l5.483.001a6.516 6.516 0 0 0 1.077 1.5L6.25 22A2.25 2.25 0 0 1 4 19.75V4.25A2.25 2.25 0 0 1 6.25 2h7.5Zm3.75 12-.09.007a.5.5 0 0 0-.402.402L17 14.5V17h-2.502l-.09.008a.5.5 0 0 0-.402.402l-.008.09.008.09a.5.5 0 0 0 .402.402l.09.008H17v2.503l.008.09a.5.5 0 0 0 .402.402l.09.008.09-.008a.5.5 0 0 0 .402-.402l.008-.09V18l2.504.001.09-.008a.5.5 0 0 0 .402-.402l.008-.09-.008-.09a.5.5 0 0 0-.403-.402l-.09-.008H18v-2.5l-.008-.09a.5.5 0 0 0-.402-.403L17.5 14Zm-8.751 3.504L11 17.499c0 .517.06 1.02.174 1.5l-2.423.005a.75.75 0 0 1-.002-1.5Z"/></svg>
                </div>
                <div class="step-text">${msg('2) Tap "Add to Home screen"')}</div>
            </div>
        </div>
        ${description ? html `<div class="description">${description}</div>`: ''}
        <slot></slot>
    </div>
    `;
};
export default template;
