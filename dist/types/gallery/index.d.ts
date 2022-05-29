import { LitElement } from 'lit';
import { WebAppManifest } from 'web-app-manifest';
export default class PWAGalleryElement extends LitElement {
    screenshots: WebAppManifest['screenshots'];
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
