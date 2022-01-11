import { Component, forwardRef, Input, OnInit, SimpleChanges } from '@angular/core';
import { I3JS, N3JS, NgxThreeUtil } from '../interface';
import { ICssStyle } from '../ngx-interface';
import { NgxAbstractSubscribeComponent } from '../subscribe.abstract';

/**
 * Transform Component
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/NgxTransformComponent) page for details.
 *
 */
@Component({
	selector: 'ngx3js-transform',
	templateUrl: './transform.component.html',
	styleUrls: ['./transform.component.scss'],
	providers: [
		{
			provide: NgxAbstractSubscribeComponent,
			useExisting: forwardRef(() => NgxTransformComponent),
		},
	],
})
export class NgxTransformComponent
	extends NgxAbstractSubscribeComponent
	implements OnInit
{
	/**
	 * The visible of transform component
	 */
	@Input() public visible: boolean = true;

	/**
	 * The anchorSeparat of transform component
	 */
	@Input() public anchorSeparat: boolean = false;

	/**
	 * The x of transform component
	 */
	@Input() public x: number = null;

	/**
	 * The y of transform component
	 */
	@Input() public y: number = null;

	/**
	 * The z of transform component
	 */
	@Input() public z: number = null;

	/**
	 * The width of transform component
	 */
	@Input() public width: number = null;

	/**
	 * The height of transform component
	 */
	@Input() public height: number = null;

	/**
	 * The left of transform component
	 */
	@Input() public left: number = null;

	/**
	 * The top of transform component
	 */
	@Input() public top: number = null;

	/**
	 * The right of transform component
	 */
	@Input() public right: number = null;

	/**
	 * The bottom of transform component
	 */
	@Input() public bottom: number = null;

	/**
	 * The anchorMinX of transform component
	 */
	@Input() public anchorMinX: number = null;

	/**
	 * The anchorMinY of transform component
	 */
	@Input() public anchorMinY: number = null;

	/**
	 * The anchorMaxX of transform component
	 */
	@Input() public anchorMaxX: number = null;

	/**
	 * The anchorMaxY of transform component
	 */
	@Input() public anchorMaxY: number = null;

	/**
	 * The pivotX of transform component
	 */
	@Input() public pivotX: number = null;

	/**
	 * The pivotY of transform component
	 */
	@Input() public pivotY: number = null;

	/**
	 * The rotationX of transform component
	 */
	@Input() public rotationX: number = null;

	/**
	 * The rotationY of transform component
	 */
	@Input() public rotationY: number = null;

	/**
	 * The rotationZ of transform component
	 */
	@Input() public rotationZ: number = null;

	/**
	 * The scaleX of transform component
	 */
	@Input() public scaleX: number = null;

	/**
	 * The scaleY of transform component
	 */
	@Input() public scaleY: number = null;

	/**
	 * The scaleZ of transform component
	 */
	@Input() public scaleZ: number = null;

	/**
	 * Gets left
	 * @param [def]
	 * @returns left
	 */
	private getLeft(def?: number): number {
		return NgxThreeUtil.getTypeSafe(this.left, def);
	}

	/**
	 * Gets top
	 * @param [def]
	 * @returns top
	 */
	private getTop(def?: number): number {
		return NgxThreeUtil.getTypeSafe(this.top, def);
	}

	/**
	 * Gets right
	 * @param [def]
	 * @returns right
	 */
	private getRight(def?: number): number {
		return NgxThreeUtil.getTypeSafe(this.right, def);
	}

	/**
	 * Gets bottom
	 * @param [def]
	 * @returns bottom
	 */
	private getBottom(def?: number): number {
		return NgxThreeUtil.getTypeSafe(this.bottom, def);
	}

	/**
	 * Gets position
	 * @param [def]
	 * @returns position
	 */
	private getPosition(def?: I3JS.Vector3): I3JS.Vector3 {
		return NgxThreeUtil.getVector3Safe(this.x, this.y, this.z, def);
	}

	/**
	 * Gets size
	 * @param [def]
	 * @returns size
	 */
	private getSize(def?: I3JS.Vector2): I3JS.Vector2 {
		return NgxThreeUtil.getVector2Safe(this.width, this.height, def);
	}

	/**
	 * Gets anchor min
	 * @param [def]
	 * @returns anchor min
	 */
	private getAnchorMin(def?: I3JS.Vector2): I3JS.Vector2 {
		return NgxThreeUtil.getVector2Safe(this.anchorMinX, this.anchorMinY, def);
	}

	/**
	 * Gets anchor max
	 * @param [def]
	 * @returns anchor max
	 */
	private getAnchorMax(def?: I3JS.Vector2): I3JS.Vector2 {
		return NgxThreeUtil.getVector2Safe(this.anchorMaxX, this.anchorMaxY, def);
	}

	/**
	 * Gets pivot
	 * @param [def]
	 * @returns pivot
	 */
	private getPivot(def?: I3JS.Vector2): I3JS.Vector2 {
		return NgxThreeUtil.getVector2Safe(this.pivotX, this.pivotY, def);
	}

	/**
	 * Gets rotation
	 * @param [def]
	 * @returns rotation
	 */
	private getRotation(def?: I3JS.Euler): I3JS.Euler {
		return NgxThreeUtil.getEulerSafe(
			this.rotationX,
			this.rotationY,
			this.rotationZ,
			def
		);
	}

	/**
	 * Gets scale
	 * @param [def]
	 * @returns scale
	 */
	private getScale(def?: I3JS.Vector3): I3JS.Vector3 {
		return NgxThreeUtil.getVector3Safe(this.scaleX, this.scaleY, this.scaleZ, def);
	}

	/**
	 * Creates an instance of transform component.
	 */
	constructor() {
		super();
	}

	/**
	 * A callback method that is invoked immediately after the default change detector has checked the directive's data-bound properties for the first time, and before any of the view or content children have been checked.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngOnInit(): void {
		super.ngOnInit('transform');
	}

	/**
	 * A callback method that performs custom clean-up, invoked immediately before a directive, pipe, or service instance is destroyed.
	 */
	ngOnDestroy(): void {
		if (this.parentNode !== null) {
			if (NgxThreeUtil.isNotNull(this.cssClazzName)) {
				NgxThreeUtil.removeCssStyle(this.parentNode, this.cssClazzName);
				this.cssClazzName = null;
			}
			this.parentNode = null;
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
		if (changes && this.cssClazzName) {
			this.addChanges(changes);
			// this.applyHtmlStyle();
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
	 * Parent node of transform component
	 */
	private parentNode: HTMLElement = null;

	/**
	 * Parent size of transform component
	 */
	private parentSize: I3JS.Vector2 = null;

	/**
	 * Ele size of transform component
	 */
	private eleSize: I3JS.Vector2 = null;

	/**
	 * Sets parent node
	 * @param parentNode
	 * @param parentSize
	 * @param eleSize
	 */
	public setParentNode(
		parentNode: HTMLElement,
		parentSize: I3JS.Vector2,
		eleSize: I3JS.Vector2
	) {
		if (this.parentNode !== parentNode) {
			this.parentNode = parentNode;
		}
		this.parentSize = parentSize;
		this.eleSize = eleSize;
		this.applyHtmlStyle();
	}

	/**
	 * Gets style
	 * @returns style
	 */
	public getStyle(): ICssStyle {
		let style: ICssStyle = {};
		if (this.parentSize !== null) {
			const anchorMin = this.getAnchorMin(new N3JS.Vector2(0, 0)).multiply(
				this.parentSize
			);
			const anchorMax = this.getAnchorMax(new N3JS.Vector2(1, 1)).multiply(
				this.parentSize
			);
			if (this.anchorSeparat) {
				const left = this.getLeft(0);
				const top = this.getTop(0);
				const right = this.getRight(0);
				const bottom = this.getBottom(0);
				const size = anchorMax.clone().sub(anchorMin);
				this.eleSize.x = size.x + left - right;
				this.eleSize.y = size.y + top - bottom;
				style.width = this.eleSize.x;
				style.height = this.eleSize.y;
				style.left = anchorMin.x + left;
				style.top = this.parentSize.y - anchorMax.y + top;
			} else {
				const size = this.getSize(this.parentSize);
				this.eleSize.x = size.x;
				this.eleSize.y = size.y;
				style.width = this.eleSize.x;
				style.height = this.eleSize.y;
				style.left = anchorMin.x;
				style.top = this.parentSize.y - anchorMax.y;
			}
			const transform: string[] = [];
			const scale = this.getScale(new N3JS.Vector3(1, 1, 1));
			if (scale.x !== 1 || scale.y !== 1 || scale.z !== 1) {
				transform.push(
					'scale3d(' + scale.x + ',' + scale.y + ',' + scale.z + ')'
				);
			}
			const rotation = this.getRotation(new N3JS.Euler(0, 0, 0));
			if (rotation.x !== 0 || rotation.y !== 0 || rotation.z !== 0) {
				const quaternion: I3JS.Quaternion = new N3JS.Quaternion();
				quaternion.setFromEuler(rotation);
				transform.push(
					'rotate3d(' +
						quaternion.x +
						',' +
						quaternion.y +
						',' +
						quaternion.z +
						',' +
						quaternion.w +
						'rad)'
				);
			}
			if (transform.length > 0) {
				style.transform = transform;
			}
			const pivot = this.getPivot(new N3JS.Vector2(0.5, 0.5));
			if (pivot.x !== 0.5 || pivot.y !== 0.5) {
				style.transformOrigin = pivot.x * 100 + '% ' + pivot.y * 100 + '%';
			}
		}
		return style;
	}

	/**
	 * Applys html style
	 */
	public applyHtmlStyle() {
		if (this.parentNode !== null && this.parentSize !== null) {
			if (this.visible) {
				const style: ICssStyle = this.getStyle();
				this.cssClazzName = NgxThreeUtil.addCssStyle(
					this.parentNode,
					style,
					this.cssClazzName,
					'transform',
					'inline'
				);
			} else {
				NgxThreeUtil.toggleCssStyle(this.parentNode, this.cssClazzName, false);
			}
		}
	}

	/**
	 * Css clazz name of transform component
	 */
	private cssClazzName: string = null;
}
