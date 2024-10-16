import { html } from 'lit';
import Utils from '../utils';
import { ManifestScreenshot } from '../types/types';

const template = (screenshots: ManifestScreenshot[], theme: string, scrollToNextPage: any, scrollToPrevPage: any) => {

    return html`
        ${screenshots? html`
            <div id="paginated_gallery" class="gallery ${theme}">
                <div class="gallery_scroller">
                    <div class="scroller_wrap">
                        ${screenshots.filter(screenshot => !screenshot.form_factor || screenshot.form_factor === Utils.deviceFormFactor()).map(screenshot => html`<img draggable="false" src='${screenshot.src}' alt='${screenshot.label || ""}'>`)}
                    </div>
                </div>
                <span class="btn prev" @click="${scrollToPrevPage}">
                    ${theme != 'default'?
                        html`<svg id="arrow-left" viewBox="0 0 23.023 18.518"><path fill="currentColor" d="M0 9.253c0 .305.134.586.378.818l8.106 8.093c.244.232.5.342.793.342.598 0 1.075-.44 1.075-1.05 0-.293-.11-.586-.306-.769l-2.734-2.783-4.834-4.407-.256.598 3.93.244h15.442c.635 0 1.075-.451 1.075-1.086s-.44-1.087-1.075-1.087H6.152l-3.93.245.256.61 4.834-4.419 2.734-2.783a1.09 1.09 0 0 0 .306-.77C10.352.44 9.875 0 9.277 0c-.293 0-.549.098-.818.366L.38 8.436c-.247.23-.38.511-.38.816Z"/></svg>`
                        :
                        html`<svg id="arrow-left" viewBox="0 0 96 96"><path d="M39.3756,48.0022l30.47-25.39a6.0035,6.0035,0,0,0-7.6878-9.223L26.1563,43.3906a6.0092,6.0092,0,0,0,0,9.2231L62.1578,82.615a6.0035,6.0035,0,0,0,7.6878-9.2231Z" fill="%23999" fill-rule="evenodd"/></svg>`
                    }
                </span>
                <span class="btn next" @click="${scrollToNextPage}">
                ${theme != 'default'?
                    html`<svg height="15" width="15">
                            <use href="#arrow-left"></use>
                        </svg>`
                    :
                    html`
                        <svg height="15" width="15">
                            <use href="#arrow-left"></use>
                        </svg>
                    `
                }
                </span>
            </div>`
        : ''}`;
};
export default template;
