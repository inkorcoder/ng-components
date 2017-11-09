import { Component, Input, ElementRef } from '@angular/core';
import './carousel.scss';


@Component({
	selector: 'carousel',
	template: `
		<div class="carousel-outer"
			(touchstart)="onDragStart($event)"
			(mousedown)="onDragStart($event)"
		>
			<div class="carousel-stage">
				<ng-content></ng-content>
			</div>
		</div>
	`
})
export class Carousel {

	@Input('items') items: number = 3;
	@Input('isResponsive') isResponsive: boolean = false;
	@Input('hasNavigation') hasNavigation: boolean = true;
	@Input('hasDots') hasDots: boolean = true;
	@Input('currentPage') currentPage: number = 1;
	@Input('pages') pages: number = 1;

	width: 			number = 0;
	height: 		number = 0;
	host: 			HTMLElement | null = null;
	dragging: 	boolean = false;

	offset: 		any = {
		x: 0,
		y: 0
	}

	ondrag: any = (event: Event)=> this.onDrag(event);
	ondragend: any = (event: Event)=> this.onDragEnd(event);

	constructor(private elementRef: ElementRef) {
		this.host = elementRef.nativeElement;
		this.updateRect();
	}

	onDragStart(event: Event | any) {
		if (this.dragging)
			return;
		this.dragging = true;
		this.offset.x = event.touches ? event.touches[0].pageX : event.pageX;
		this.offset.y = event.touches ? event.touches[0].pageY : event.pageY;
		document.addEventListener('mousemove', this.ondrag);
		document.addEventListener('mouseup', this.ondragend);
	}

	onDrag(event: Event) {
		event.preventDefault();
		console.log(event)
	}

	onDragEnd(event: Event | any) {
		this.dragging = false;
		console.log('up')
		document.removeEventListener('mousemove', this.onDrag);
		document.removeEventListener('mouseup', this.onDragEnd);
	}

	updateRect() {
		let rect = this.host.getBoundingClientRect();
		this.width = rect.width;
		this.height = rect.height;
	}

	ngOnInit() {
		console.log(this)
	}
}