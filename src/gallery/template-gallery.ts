import { html } from 'lit';
import { WebAppManifest } from 'web-app-manifest';

const template = (screenshots: WebAppManifest['screenshots'], scrollToNextPage: any, scrollToPrevPage: any) => {
    return html`
        ${screenshots? html`
            <div id="paginated_gallery" class="gallery">
                <div class="gallery_scroller">
                    <div class="scroller_wrap">
                        ${screenshots.map(screenshot => html`<img draggable="false" src='${screenshot.src}'>`)}
                    </div>
                </div>
                <span class="btn prev" @click="${scrollToPrevPage}">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"><title/><path d="M39.3756,48.0022l30.47-25.39a6.0035,6.0035,0,0,0-7.6878-9.223L26.1563,43.3906a6.0092,6.0092,0,0,0,0,9.2231L62.1578,82.615a6.0035,6.0035,0,0,0,7.6878-9.2231Z" fill="%23999" fill-rule="evenodd"/></svg>
                </span>
                <span class="btn next" @click="${scrollToNextPage}">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"><title/><path d="M69.8437,43.3876,33.8422,13.3863a6.0035,6.0035,0,0,0-7.6878,9.223l30.47,25.39-30.47,25.39a6.0035,6.0035,0,0,0,7.6878,9.2231L69.8437,52.6106a6.0091,6.0091,0,0,0,0-9.223Z" fill="%23000" fill-rule="evenodd"/></svg>
                </span>
            </div>`
        : ''}`;
};
export default template;
