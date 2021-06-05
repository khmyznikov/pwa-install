export default class TouchDragListener {
    el: HTMLElement;
    active: boolean;
    currentY: number;
    currentX: number;
    initialY: number;
    yOffset: number;
    offSetY: number;
    touchStartCallback: any;
    touchEndCallback: any;
    touchMoveCallback: any;
    showLog: boolean;
    constructor(el: HTMLElement, touchStartCallback: any, touchEndCallback: any, touchMoveCallback: any, showLog?: boolean);
    dragStart(e: MouseEvent | TouchEvent): void;
    dragEnd(e: MouseEvent | TouchEvent): void;
    drag(e: MouseEvent | TouchEvent): void;
}
