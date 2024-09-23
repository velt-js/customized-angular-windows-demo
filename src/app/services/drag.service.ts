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

	onMouseDown(event: MouseEvent, appWindow: HTMLElement) {
		this.isDragging = true;
		this.dragStartX = event.clientX;
		this.dragStartY = event.clientY;
		this.windowStartX = appWindow.offsetLeft;
		this.windowStartY = appWindow.offsetTop;
		event.preventDefault();
	}

	onMouseMove(event: MouseEvent, appWindow: HTMLElement) {
		if (this.isDragging) {
			const deltaX = event.clientX - this.dragStartX;
			const deltaY = event.clientY - this.dragStartY;
			appWindow.style.left = `${this.windowStartX + deltaX}px`;
			appWindow.style.top = `${this.windowStartY + deltaY}px`;
		}
	}

	onMouseUp() {
		this.isDragging = false;
	}
}