import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { ManifestScreenshot } from '../types/types';

import styles from './styles-gallery.scss';
import template from './template-gallery';

@customElement('pwa-gallery')
export default class PWAGalleryElement extends LitElement {
	@property({ type: Array }) screenshots: ManifestScreenshot[] = [];
	@property() theme: 'default' | 'apple_desktop' | 'apple_mobile' = 'default';
	@property({ type: Boolean }) rtl: boolean = false;

	static get styles() {
		return styles;
	}

	private getScrollElements = () => {
		const gallery = this.shadowRoot?.querySelector('#paginated_gallery') as HTMLElement | null;
		if (!gallery) return;
		
		const galleryScroller = gallery.querySelector('.gallery_scroller') as HTMLElement | null;
		if (!galleryScroller) return;
	
		const galleryItems = Array.from(galleryScroller.querySelectorAll('img')) as HTMLElement[];
		if (galleryItems.length === 0) return;
	
		return {
			scroller: galleryScroller,
			items: galleryItems
		};
	};
	
	private findCurrentItem = (scroller: HTMLElement, items: HTMLElement[]): HTMLElement | null => {
		const scrollLeft = scroller.scrollLeft * (this.rtl? -1 : 1);
	  	// Find the item closest to the center of the viewport.
		return items.find((item) => (item.offsetWidth + item.offsetLeft * (this.rtl? -1 : 1)) >= scrollLeft + (item.offsetWidth / 2.5)) || null;
	};
	
	private scrollToPage = (direction: 'next' | 'prev') => {
		const scrollData = this.getScrollElements();
		if (!scrollData) return;
	
		const { scroller, items } = scrollData;
		const currentItem = this.findCurrentItem(scroller, items);
		if (!currentItem) return;
	
		const currentIndex = items.indexOf(currentItem);
		const offset = (direction === 'next' ? 1 : -1) * (this.rtl? -1 : 1) ;
		const targetIndex = currentIndex + offset;
		
		if (targetIndex >= 0 && targetIndex < items.length) {
			items[targetIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
		}
	};
	
	public scrollToNextPage = () => {
		this.scrollToPage('next');
	};
	
	public scrollToPrevPage = () => {
		this.scrollToPage('prev');
	};


	private _init = () => {
		return;
	}

	firstUpdated () {
		const _tools = this.getScrollElements();
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
			this.theme,
			this.scrollToNextPage,
			this.scrollToPrevPage
        )}`;
	}
}
