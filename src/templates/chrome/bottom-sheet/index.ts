import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { IWindow, IManifest } from '../../../types/types';

import TouchDragListener from "./touch-listener";

declare const window: IWindow;

type IProps = {
    name: string, 
    description: string,
    icon: string
}

import template from './template-bottom-sheet';

@customElement('pwa-bottom-sheet')
export default class PWABottomSheetElement extends LitElement {	
	@property() props: IProps = {
        name: '',
        description: '',
        icon: ''
    };
    @property() install = () => {};
	
	private _init = () => {
		const dragMobileSheet = (element: HTMLElement | null, touchTargetElement: HTMLElement | undefined) => {
			if (!element || !touchTargetElement)
				return

			let dragOffset = 0;
			const bounceOffset = 35;

			const getYCoord = (e: MouseEvent | TouchEvent): number => {
				return (e as MouseEvent).clientY || ((e as TouchEvent).changedTouches && (e as TouchEvent).changedTouches.length? (e as TouchEvent).changedTouches[0].clientY : 0);
			}
			
			const dragMouseDown = (e: MouseEvent | TouchEvent) => {
				// e.preventDefault();
				// get the mouse cursor position at startup:
				// pos3 = e.clientX;
				// pos4 = e.clientY;
				window.addEventListener('mouseup', dragMouseUp);
				window.addEventListener('mousemove', dragMouseMove);

				window.addEventListener('touchend', dragMouseUp);
				window.addEventListener('touchmove', dragMouseMove);

				// document.onmouseup = dragMouseUp;
				document.ontouchend = dragMouseUp;
				// element.onmouseout = closeDragElement;
				// call a function whenever the cursor moves:
				// document.onmousemove = elementDrag;

				dragOffset = getYCoord(e) - touchTargetElement.getBoundingClientRect().top;
			}
			const dragMouseUp = (e: MouseEvent | TouchEvent) => {
				// e.preventDefault();

				if (getYCoord(e) >= window.innerHeight - 25){
					closeDragElement(e, window.innerHeight + 50);
					return
				}
				if (window.innerHeight - getYCoord(e)  > element.clientHeight / 2){
					closeDragElement(e, window.innerHeight - element.clientHeight);
					return
				}
				else {
					closeDragElement(e, window.innerHeight - 100 - bounceOffset);
					return
				}
				
				// closeDragElement(e);
			}
			
			const dragMouseMove = (e: MouseEvent | TouchEvent) => {
				// e.preventDefault();
				// calculate the new cursor position:
				// pos1 = pos3 - e.clientX;
				// pos2 = pos4 - e.clientY;
				// pos3 = e.clientX;
				const currentY = getYCoord(e);
				// set the element's new position:
				// element.style.top = (element.offsetTop - pos2) + "px";
				// elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";

				if (currentY <= (window.innerHeight - element.clientHeight + dragOffset)) {
					// closeDragElement(e, window.innerHeight - element.clientHeight);
					return
				}

				element.style.setProperty(
					"transition",
					`none`
				)

				element.style.setProperty(
					"--translateY",
					`translateY(${currentY - dragOffset}px)`
				);
				// console.log(e.clientY);
			}
			
			const closeDragElement = (e: MouseEvent | TouchEvent, toPoint?: number) => {
				/* stop moving when mouse button is released:*/
				// document.onmouseup = null;
				// document.onmousemove = null;

				window.removeEventListener('mouseup', dragMouseUp);
				window.removeEventListener('mousemove', dragMouseMove);
				window.removeEventListener('touchend', dragMouseUp);
				window.removeEventListener('touchmove', dragMouseMove);

				if (!toPoint && getYCoord(e) >= window.innerHeight - 100)
					element.style.setProperty(
						"--translateY",
						`translateY(calc(100vh - 100px))`
					);
				else				
					element.style.setProperty(
						"--translateY",
						`translateY(${(toPoint || getYCoord(e)) + bounceOffset}px)`
					);

				element.style.setProperty(
					"transition",
					`transform 500ms cubic-bezier(0.4, 0, 0, 1) 0s`
				);
			}

			touchTargetElement.addEventListener('mousedown', dragMouseDown);
			touchTargetElement.addEventListener('touchstart', dragMouseDown);
		}
		dragMobileSheet(this.parentElement, this.parentElement?.getElementsByClassName('touch-header')[0] as HTMLElement);
		return;
	}

	firstUpdated () {
		this._init();
        return;
	}

    createRenderRoot() {
        return this;
    }

	connectedCallback() {
		super.connectedCallback()

	}

	render() {
        return html`${template(this.props.name, this.props.description, this.props.icon, this.install)}`;
	}
}
