import { html } from 'lit-element';
import { IManifest } from '../types';

const template = (screenshots: IManifest['screenshots'], scrollToNextPage: any, scrollToPrevPage: any) => {
    return html`
        ${screenshots? html`
            <div id="paginated_gallery" class="gallery">
                <div class="gallery_scroller">
                    ${screenshots.map(screenshot => html`<img src='${screenshot.src}'>`)}
                </div>
                <span class="btn prev" @click="${scrollToPrevPage}"></span>
                <span class="btn next" @click="${scrollToNextPage}"></span>
            </div>`
        : ''}`;
};
export default template;