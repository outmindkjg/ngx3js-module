import {
	Directive,
	ElementRef,
	Input,
	OnChanges,
	SimpleChanges,
} from '@angular/core';
import * as THREE from 'three';
import { ThreeColor, ThreeUtil } from '../interface';

/**
 * Drawing Canvas Directive
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/DrawingCanvasDirective) page for details.
 * See the [ngx directives](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_directives) page for a live demo.
 *
 * ```html
 * <canvas ngx3jsDrawingCanvas 
 * 	[clearColor]="'#ffffff'" 
 * 	[lineColor]="'#000000'" 
 * />
 * ```
 *
 */
@Directive({
	selector: '[ngx3jsDrawingCanvas]',
})
export class DrawingCanvasDirective implements OnChanges {
	/**
	 * The canvas background color
	 */
	@Input() public clearColor: ThreeColor = 0xffffff;

	/**
	 * The drawing line color
	 */
	@Input() public lineColor: ThreeColor = 0x000000;

	/**
	 * The drawing line dash
	 */
	@Input() public lineDash: string = 'solid';

	/**
	 * The drawing line width
	 */
	@Input() public lineWidth: number = 1;

	/**
	 * The Canvas
	 */
	private drawingCanvas: HTMLCanvasElement = null;

	/**
	 * The Context of canvas.
	 */
	private drawingContext: CanvasRenderingContext2D = null;

	/**
	 * Creates an instance of drawing canvas directive.
	 * @param ele
	 */
	constructor(ele: ElementRef) {
		this.drawingCanvas = ele.nativeElement;
		const cleatBtn = document.createElement('button');
		cleatBtn.className = 'clear-btn';
		cleatBtn.innerText = 'x';
		cleatBtn.style.pointerEvents = 'auto';
		this.drawingCanvas.parentNode.appendChild(cleatBtn);
		this.drawingCanvas.style.pointerEvents = 'auto';
		cleatBtn.addEventListener('click', (e) => {
			this.clearCanvas();
			e.stopPropagation();
		});
		this.drawingContext = this.drawingCanvas.getContext('2d');
	}

	ngOnInit(): void {
		this.setupCanvasDrawing();
	}

	/**
	 * A callback method that is invoked immediately after the default change detector has checked the directive's data-bound properties for the first time, and before any of the view or content children have been checked.
	 * It is invoked only once when the directive is instantiated.
	 * default change detector has checked data-bound properties if at least one has changed, and before the view and content children are checked.
	 *
	 * @param changes The changed properties.
	 */
	ngOnChanges(changes: SimpleChanges): void {
		if (changes.clearColor) {
			this._backgroundColor = null;
		}
		if (changes.lineColor) {
			this._lineColor = null;
		}
		if (this._eventAttached && this._backgroundColor === null) {
			this.clearCanvas();
		}
	}

	/**
	 * Background color of drawing canvas directive
	 */
	private _backgroundColor: string = null;

	/**
	 * Line color of drawing canvas directive
	 */
	private _lineColor: string = null;

	/**
	 * Whether the mouse is down or not.
	 */
	private paint = false;

	/**
	 * The drawing start position.
	 */
	private drawStartPos = new THREE.Vector2();

	/**
	 * Clear the Canvas.
	 */
	clearCanvas(): void {
		this.drawingContext.save();
		this.drawingContext.setTransform(1, 0, 0, 1, 0, 0);
		if (this._backgroundColor === null) {
			if (this.clearColor === 'transparent' || this.clearColor === '') {
				this._backgroundColor = '#ffffff';
			} else {
				this._backgroundColor =
					'#' + ThreeUtil.getColorSafe(this.clearColor).getHexString();
			}
		}
		if (this.clearColor === 'transparent' || this.clearColor === '') {
			this.drawingContext.clearRect(
				0,
				0,
				this.drawingCanvas.width,
				this.drawingCanvas.height
			);
		} else {
			this.drawingContext.fillStyle = this._backgroundColor;
			this.drawingContext.fillRect(
				0,
				0,
				this.drawingCanvas.width,
				this.drawingCanvas.height
			);
			this.drawingContext.restore();
		}
		this.drawingContext.beginPath();
		this.drawStartPos = new THREE.Vector2();
		this.drawingCanvas.dispatchEvent(this.event);
		this.drawingContext.globalAlpha = 1.0;
	}

	private _eventAttached: boolean = false;
	/**
	 * Set the canvas be drawable.
	 */
	private setupCanvasDrawing(): void {
		this.drawingCanvas.addEventListener('pointerdown', (e) => {
			this.paint = true;
			this.drawStartPos.set(e.offsetX, e.offsetY);
			e.stopPropagation();
		});
		this.drawingCanvas.addEventListener('pointermove', (e) => {
			if (this.paint) {
				this.draw(this.drawingContext, e.offsetX, e.offsetY);
			}
			e.stopPropagation();
		});
		this.drawingCanvas.addEventListener('pointerup', () => {
			this.paint = false;
		});
		this.drawingCanvas.addEventListener('pointerleave', () => {
			this.paint = false;
		});
		this.clearCanvas();
		this._eventAttached = true;
	}

	/**
	 * The event of drawing canvas.
	 */
	private event = new Event('needupdate');

	/**
	 * Draw a line to canvas
	 *
	 * @param drawContext
	 * @param x
	 * @param y
	 */
	private draw(
		drawContext: CanvasRenderingContext2D,
		x: number,
		y: number
	): void {
		if (this._lineColor === null) {
			this._lineColor =
				'#' + ThreeUtil.getColorSafe(this.lineColor).getHexString();
			drawContext.beginPath();
		}
		if (ThreeUtil.isNotNull(this.lineDash)) {
			switch (this.lineDash) {
				case 'dashed':
					drawContext.setLineDash([4, 8]);
					break;
				case 'dotted':
					drawContext.setLineDash([4, 4]);
					break;
				case 'solid':
					drawContext.setLineDash([]);
					break;
			}
		}
		drawContext.moveTo(this.drawStartPos.x, this.drawStartPos.y);
		drawContext.strokeStyle = this._lineColor;
		drawContext.lineTo(x, y);
		if (ThreeUtil.isNotNull(this.lineWidth)) {
			drawContext.lineWidth = this.lineWidth;
		}
		drawContext.stroke();
		this.drawStartPos.set(x, y);
		this.drawingCanvas.dispatchEvent(this.event);
	}
}
