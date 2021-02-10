import { LitElement } from 'lit-element';
import { IManifest } from '../types';
export default class PWAGalleryElement extends LitElement {
    screenshots: IManifest['screenshots'];
    static get styles(): CSSStyleSheet;
    scrollToNextPage: () => void;
    scrollToPrevPage: () => void;
    private _init;
    connectedCallback(): void;
    render(): import("lit-element").TemplateResult;
}
