import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgIf } from '@angular/common';

import { RouterOutlet } from '@angular/router';
import { initVelt } from '@veltdev/client';
import { User, Velt } from '@veltdev/types';
import { WireframeComponent } from './component/wireframe/wireframe.component';
import { DragService } from './services/drag.service';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, WireframeComponent, NgIf],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {
	title = 'windows';
	showWindow: boolean = true;

	client?: Velt;

	audioElement: HTMLAudioElement;

	constructor(private dragService: DragService) {
		this.initVelt();
		this.audioElement = new Audio('assets/click.mp3');
	}

	// Initialize velt sdk
	async initVelt() {
		this.client = await initVelt('AN5s6iaYIuLLXul0X4zf');
		this.setUser();
		this.client?.setDocument('windowsXP', { documentName: 'windowsXP' })
		this.client?.getCommentElement().disableUserMentions();
	}

	// login with your user in velt
	setUser() {
		if (this.client) {
			const user: User = {
				userId: `penguin-joe`,
				name: 'Joe',
				email: `joe@velt.dev`,
				//photoUrl: 'https://firebasestorage.googleapis.com/v0/b/velt-demo/o/Dog_upscaled.png?alt=media&token=8424745d-c7c0-4bdd-b2a5-a7f6e8bbeef6',
				photoUrl: 'https://firebasestorage.googleapis.com/v0/b/velt-demo/o/Penguin_upscaled.png?alt=media&token=99336bbb-5a9d-4600-b079-ab0e2e0600fb',
				textColor: "#fff",
				organizationId: "velt-sample-app",
			};
			this.client.identify(user);
		}
	}

	playClickSound() {
		this.audioElement.currentTime = 0;
		this.audioElement.play();
	}

	onMouseDown(event: MouseEvent) {
		const appWindow = document.querySelector('.app-window') as HTMLElement;
		this.dragService.onMouseDown(event, appWindow);
	}

	onMouseMove(event: MouseEvent) {
		const appWindow = document.querySelector('.app-window') as HTMLElement;
		this.dragService.onMouseMove(event, appWindow);
	}

	onMouseUp() {
		this.dragService.onMouseUp();
	}
}
