import { LitElement } from 'lit';
import { IManifest } from '../types/types';
export default class PWAGalleryElement extends LitElement {
    screenshots: IManifest['screenshots'];
    static get styles(): CSSStyleSheet;
    calcScrollSize: () => {
        scroller: Element;
        item: HTMLImageElement;
    } | undefined;
    scrollToNextPage: () => void;
    scrollToPrevPage: () => void;
    private _init;
    firstUpdated(): void;
    connectedCallback(): void;
    render(): import("lit-html").TemplateResult<1>;
}
