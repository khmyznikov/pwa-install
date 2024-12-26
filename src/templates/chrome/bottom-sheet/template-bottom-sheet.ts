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
                    <svg height="24" viewBox="0 -960 960 960" width="24" fill=""><path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z"/></svg>
                </div>
                <div class="step-text">${msg('1) Open your browser menu')}</div>
            </div>
            <div class="description-step">
                <div class="svg-wrap add-icon">
                    <svg height="24" viewBox="0 -960 960 960" width="24"><path d="M320-40q-33 0-56.5-23.5T240-120v-160h80v40h400v-480H320v40h-80v-160q0-33 23.5-56.5T320-920h400q33 0 56.5 23.5T800-840v720q0 33-23.5 56.5T720-40H320Zm0-120v40h400v-40H320ZM176-280l-56-56 224-224H200v-80h280v280h-80v-144L176-280Zm144-520h400v-40H320v40Zm0 0v-40 40Zm0 640v40-40Z"/></svg>
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
