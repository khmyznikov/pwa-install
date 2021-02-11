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

	public calcScrollSize = () => {
		//@ts-ignore
		const gallery = this.shadowRoot.querySelector('#paginated_gallery');
		if (!gallery)
			return;
		const gallery_scroller = gallery.querySelector('.gallery_scroller');
		if (!gallery_scroller)
			return;
		const gallery_items = Array.from(gallery_scroller.querySelectorAll('img'));
		if (!gallery_items)
			return;
		const gallery_item = gallery_items.find((item) => { return (item.offsetWidth + item.offsetLeft) >= gallery_scroller.scrollLeft})
		if (!gallery_item)
			return;
		
		return {
			scroller: gallery_scroller,
			amount: gallery_scroller.clientWidth < gallery_item.clientWidth? gallery_item.clientWidth / 2 + 20 :  gallery_item.clientWidth
		}
	}
	public scrollToNextPage = () => {
		const _tools = this.calcScrollSize();
		if (_tools)
			_tools.scroller.scrollTo({
				top: 0,
				left: _tools.scroller.scrollLeft + _tools.amount,
				behavior: 'smooth'
			});
	}
	public scrollToPrevPage = () => {
		const _tools = this.calcScrollSize();
		if (_tools)
			_tools.scroller.scrollTo({
				top: 0,
				left: _tools.scroller.scrollLeft - _tools.amount,
				behavior: 'smooth'
			});
	}

	
	private _init = () => {
		return;
	}

	firstUpdated () {
		const _tools = this.calcScrollSize();
		if (_tools)
			setTimeout(
				() => {
					_tools.scroller.scrollTo({
						top: 0,
						left: 0
					});
				},
				300
			)
			
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
