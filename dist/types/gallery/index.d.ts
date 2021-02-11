import { LitElement } from 'lit-element';
import { IManifest } from '../types';
export default class PWAGalleryElement extends LitElement {
    screenshots: IManifest['screenshots'];
    static get styles(): CSSStyleSheet;
    calcScrollSize: () => {
        scroller: Element;
        amount: number;
    } | undefined;
    scrollToNextPage: () => void;
    scrollToPrevPage: () => void;
    private _init;
    firstUpdated(): void;
    connectedCallback(): void;
    render(): import("lit-element").TemplateResult;
}
