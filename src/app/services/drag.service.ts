import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class DragService {
	private isDragging: boolean = false;
	private dragStartX: number = 0;
	private dragStartY: number = 0;
	private windowStartX: number = 0;
	private windowStartY: number = 0;

	constructor() { }

	onMouseDown(event: MouseEvent, appHeader: HTMLElement) {
		this.isDragging = true;
		this.dragStartX = event.clientX;
		this.dragStartY = event.clientY;
		this.windowStartX = appHeader?.parentElement?.offsetLeft ?? 0;
		this.windowStartY = appHeader?.parentElement?.offsetTop ?? 0;
		event.preventDefault();
	}

	onMouseMove(event: MouseEvent, appHeader: HTMLElement) {
		if (this.isDragging) {
			const deltaX = event.clientX - this.dragStartX;
			const deltaY = event.clientY - this.dragStartY;
			appHeader.parentElement!.style.left = `${this.windowStartX + deltaX}px`;
			appHeader.parentElement!.style.top = `${this.windowStartY + deltaY}px`;
		}
	}

	onMouseUp() {
		this.isDragging = false;
	}
}