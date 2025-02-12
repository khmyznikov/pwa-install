import { LitElement } from 'lit';
import { ManifestScreenshot } from '../types/types';
export default class PWAGalleryElement extends LitElement {
    screenshots: ManifestScreenshot[];
    theme: 'default' | 'apple_desktop' | 'apple_mobile';
    rtl: boolean;
    static get styles(): CSSStyleSheet;
    private getScrollElements;
    private findCurrentItem;
    private scrollToPage;
    scrollToNextPage: () => void;
    scrollToPrevPage: () => void;
    private _init;
    firstUpdated(): void;
    connectedCallback(): void;
    render(): import("lit").TemplateResult<1>;
}
