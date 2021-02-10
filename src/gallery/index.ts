import { customElement, LitElement, html, property } from 'lit-element';
import { IWindow, IManifest } from '../types';

declare const window: IWindow;

import styles from './styles-gallery.scss';
import template from './template-gallery';

@customElement('pwa-gallery')
export default class PWAGalleryElement extends LitElement {	
	@property() screenshots: IManifest['screenshots'] = [];

	static get styles() {
		return styles;
	}

	public scrollToNextPage = () => {
		//@ts-ignore
		const gallery = this.shadowRoot.querySelector('#paginated_gallery');
		if (!gallery)
			return;
		const gallery_scroller = gallery.querySelector('.gallery_scroller');
		if (!gallery_scroller)
			return;
		const gallery_item = gallery_scroller.querySelector('img');
		if (!gallery_item)
			return;
		gallery_scroller.scrollTo({
			top: 0,
			left: gallery_scroller.scrollLeft + gallery_item.clientWidth,
			behavior: 'smooth'
		  });
	}
	public scrollToPrevPage = () => {
		//@ts-ignore
		const gallery = this.shadowRoot.querySelector('#paginated_gallery');
		if (!gallery)
			return;
		const gallery_scroller = gallery.querySelector('.gallery_scroller');
		if (!gallery_scroller)
			return;
		const gallery_item = gallery_scroller.querySelector('img');
		if (!gallery_item)
			return;
		gallery_scroller.scrollTo({
			top: 0,
			left: gallery_scroller.scrollLeft - gallery_item.clientWidth,
			behavior: 'smooth'
		  });
	}

	
	private _init = () => {
	}

	connectedCallback() {
		super.connectedCallback()
		this._init();
	}

	render() {
        return html`${template(
            this.screenshots,
			this.scrollToNextPage,
			this.scrollToPrevPage
        )}`;
	}
}
