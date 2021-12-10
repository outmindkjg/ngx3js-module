import {
	Component,
	ElementRef,
	Input,
	OnInit,
	SimpleChanges,
} from '@angular/core';
import * as THREE from 'three';
import { AbstractSubscribeComponent } from '../subscribe.abstract';
import { HtmlCollection } from '../visual/visual.component';
import { CssStyle, ThreeUtil } from './../interface';
import { I3JS } from '../threejs-library/three-interface';

/**
 * The Canvas component.
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/CanvasComponent) page for details.
 * See the [ngx hud](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_hud) page for a live demo.
 *
 */
@Component({
	selector: 'ngx3js-canvas',
	templateUrl: './canvas.component.html',
	styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent
	extends AbstractSubscribeComponent
	implements OnInit
{
	/**
	 * The name of the object (doesn't need to be unique). Default is an empty string.
	 */
	@Input() public name: string = '';

	/**
	 * The Collection of canvas component
	 */
	private collection: HtmlCollection = {
		html: null,
		name: null,
		component: this,
		children: [],
	};

	/**
	 * Creates an instance of canvas component.
	 */
	constructor(private ele: ElementRef) {
		super();
	}

	/**
	 * A callback method that is invoked immediately after the default change detector has checked the directive's data-bound properties for the first time, and before any of the view or content children have been checked.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngOnInit(): void {
		super.ngOnInit('canvas');
	}

	/**
	 * A callback method that performs custom clean-up, invoked immediately before a directive, pipe, or service instance is destroyed.
	 */
	ngOnDestroy(): void {
		if (this.canvas !== null) {
			if (ThreeUtil.isNotNull(this.canvas.parentNode)) {
				this.canvas.parentNode.removeChild(this.canvas);
			}
			if (ThreeUtil.isNotNull(this.cssClazzName)) {
				ThreeUtil.removeCssStyle(this.canvas, this.cssClazzName);
				this.cssClazzName = null;
			}
			this.canvas = null;
		}
		super.ngOnDestroy();
	}

	/**
	 * A callback method that is invoked immediately after the default change detector has checked the directive's data-bound properties for the first time, and before any of the view or content children have been checked.
	 * It is invoked only once when the directive is instantiated.
	 * default change detector has checked data-bound properties if at least one has changed, and before the view and content children are checked.
	 *
	 * @param changes The changed properties.
	 */
	ngOnChanges(changes: SimpleChanges): void {
		super.ngOnChanges(changes);
		if (changes && this.canvas) {
			this.addChanges(changes);
		}
	}

	/**
	 * A callback method that is invoked immediately after Angular has completed initialization of all of the directive's content.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngAfterContentInit(): void {
		super.ngAfterContentInit();
	}

	/**
	 * The Canvas of canvas component
	 */
	private canvas: HTMLElement = null;

	/**
	 * Parent node of canvas component
	 */
	private parentNode: HTMLElement = null;

	/**
	 * Canvas size of canvas component
	 */
	private canvasSize: I3JS.IVector2 = null;

	/**
	 * Ele size of canvas component
	 */
	private eleSize: I3JS.IVector2 = null;

	/**
	 * Sets size
	 * @param size
	 */
	public setSize(size: I3JS.IVector2) {
		this.canvasSize = size;
		this.eleSize = new THREE.Vector2(this.canvasSize.x, this.canvasSize.y);
		this.applyHtmlStyle();
	}

	/**
	 * Sets parent node
	 * @param parentNode
	 */
	public setParentNode(parentNode: HTMLElement) {
		if (this.parentNode !== parentNode) {
			this.parentNode = parentNode;
			this.getCanvas();
		}
	}

	/**
	 * Applys changes
	 * @param changes
	 */
	public applyChanges(changes: string[]) {
		if (this.canvas !== null) {
			if (ThreeUtil.isIndexOf(changes, 'init')) {
				changes = ThreeUtil.pushUniq(changes, []);
			}
			super.applyChanges(changes);
		}
	}

	/**
	 * Gets collection
	 * @returns collection
	 */
	public getCollection(): HtmlCollection {
		return this.collection;
	}

	/**
	 * Gets style
	 * @returns style
	 */
	public getStyle(): CssStyle {
		const style: CssStyle = {
			position: 'absolute',
			left: 0,
			top: 0,
			width: '100%',
			height: '100%',
		};
		if (this.canvasSize !== null) {
			style.width = this.canvasSize.x;
			style.height = this.canvasSize.y;
		}
		return style;
	}

	/**
	 * Applys html style
	 */
	public applyHtmlStyle() {
		if (this.canvas !== null) {
			const style: CssStyle = this.getStyle();
			this.cssClazzName = ThreeUtil.addCssStyle(
				this.canvas,
				style,
				this.cssClazzName,
				'canvas'
			);
		}
	}

	/**
	 * Css clazz name of canvas component
	 */
	private cssClazzName: string = null;

	/**
	 * Gets object
	 * @returns object
	 */
	public getObject<T>(): T {
		return this.getCanvas() as any;
	}

	/**
	 * Gets canvas
	 * @returns canvas
	 */
	public getCanvas(): HTMLElement {
		if (this.canvas === null || this._needUpdate) {
			this.needUpdate = false;
			const canvas = document.createElement('div');
			canvas.classList.add('ngx3js-canvas');
			if (this.canvas !== null && this.canvas.parentNode !== null) {
				this.canvas.parentNode.removeChild(this.canvas);
			}
			this.canvas = canvas;
			this.canvas.appendChild(this.ele.nativeElement);
			this.canvas.addEventListener('pointerdown', (e) => {
				e.stopPropagation();
			});

			this.collection.html = this.canvas;
			this.collection.children = [];
			this.collection.component = this;
			this.collection.name = this.name;
			super.setObject(this.collection);
		}
		if (
			this.parentNode !== null &&
			this.canvas.parentNode !== this.parentNode
		) {
			this.parentNode.appendChild(this.canvas);
			this.applyHtmlStyle();
		}
		return this.canvas;
	}
}
