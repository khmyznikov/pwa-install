export default class TouchDragListener {
    el: HTMLElement;
    active = false;
    currentY = 0;
    currentX = 0;
    initialY = 0;
    yOffset = 0;
    offSetY = 0;

    touchStartCallback: any;
    touchEndCallback: any;
    touchMoveCallback: any;
    showLog: boolean;

	constructor(el: HTMLElement, touchStartCallback: any, touchEndCallback: any, touchMoveCallback: any, showLog?: boolean) {
        this.el = el;
        this.touchStartCallback = touchStartCallback;
        this.touchEndCallback = touchEndCallback;
        this.touchMoveCallback = touchMoveCallback;
        this.showLog = showLog || false;

		this.dragStart = this.dragStart.bind(this);
        this.dragEnd = this.dragEnd.bind(this);
		this.drag = this.drag.bind(this);
		
		this.el.addEventListener("mousedown", this.dragStart);
        this.el.addEventListener("mouseleave", this.dragEnd);
        this.el.addEventListener("mouseup", this.dragEnd);
        this.el.addEventListener("mousemove", this.drag);

        this.el.addEventListener("touchstart", this.dragStart);
        this.el.addEventListener("touchend", this.dragEnd);
        this.el.addEventListener("touchmove", this.drag);
	}

	dragStart(e: MouseEvent | TouchEvent) {
        this.active = true;
        this.el.classList.add("active");

        if (e.type === "touchstart") {
            this.initialY = (e as TouchEvent).touches[0].clientY - this.yOffset;
        } else {
            this.initialY = (e as MouseEvent).clientY - this.yOffset;
        }

        if (!this.touchStartCallback) return;

        this.touchStartCallback(
            this.el,
            this.active,
            this.currentY,
            this.initialY,
            this.offSetY
        )
	}
	
    dragEnd(e: MouseEvent | TouchEvent) {
        this.active = false;
        this.el.classList.remove("active");

        this.yOffset = 0;

        this.initialY = this.currentY;
        
        if (!this.touchEndCallback) return;

        this.touchEndCallback(
            this.el,
            this.active,
            this.currentY,
            this.initialY,
            this.offSetY
        )
    }
    drag(e: MouseEvent | TouchEvent) {
        if (!this.active) return;
        e.preventDefault();

        if (e.type == "touchmove") {
            this.currentY = (e as TouchEvent).touches[0].clientY - this.initialY;
        } else {
            this.currentY = (e as MouseEvent).clientY - this.initialY;
        }

        this.yOffset = this.currentX;

        if (!this.touchMoveCallback) return;

        this.touchMoveCallback(
            this.el,
            this.active,
            this.currentY,
            this.initialY,
            this.offSetY
        );

        if (this.showLog) {
            console.log({
                active: this.active,
                initialY: this.initialY,
                currentY: this.currentY,
                offSetY: this.offSetY
            });
        }        
    }
}