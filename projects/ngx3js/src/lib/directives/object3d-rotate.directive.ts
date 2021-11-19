import { Directive, forwardRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { RendererTimer, ThreeUtil } from '../interface';
import { AbstractObject3dDirective } from '../directive.abstract';
import { AbstractObject3dComponent } from '../object3d.abstract';

type ScaleFunction = (object3d : THREE.Object3D, elapsedTime? : number, timer? : RendererTimer)=>void;

/**
 * Rotate options
 */
interface RotateOptions {
	/** type */
	type?: 'x' | 'y' | 'z' | 'xy' | 'xz' | 'yz' | 'xyz' | 'function' | 'none' | string;

	/** speed */
	speed?: number;

	funType? : string | ScaleFunction;
}

/**
 * Rotate Directive
 *
 * @example
 * ```html
 *  <ngx3js-mesh [ngx3jsRotate]="{ type : ''}"></ngx3js-mesh>
 * ```
 *
 */
@Directive({
	selector: '[ngx3jsRotate]',
	providers: [
		{
			provide: AbstractObject3dDirective,
			useExisting: forwardRef(() => RotateDirective),
		},
	]
})
export class RotateDirective
	extends AbstractObject3dDirective
	implements OnChanges
{
	/**
	 * The canvas background color
	 */
	@Input('ngx3jsRotate') public ngx3jsRotate: RotateOptions | string = 'xyz';

	/**
	 * Creates an instance of drawing canvas directive.
	 * @param ele
	 */
	constructor(object3d: AbstractObject3dComponent) {
		super(object3d);
	}

	/**
	 * A callback method that is invoked immediately after the default change detector has checked the directive's data-bound properties for the first time, and before any of the view or content children have been checked.
	 * It is invoked only once when the directive is instantiated.
	 * default change detector has checked data-bound properties if at least one has changed, and before the view and content children are checked.
	 *
	 * @param changes The changed properties.
	 */
	ngOnChanges(changes: SimpleChanges): void {
		if (changes.ngx3jsRotate && ThreeUtil.isNotNull(this.ngx3jsRotate)) {
			if (typeof this.ngx3jsRotate === 'string') {
				this._roteteType = this.ngx3jsRotate;
			} else {
				if (ThreeUtil.isNotNull(this.ngx3jsRotate.type)) {
					this._roteteType = this.ngx3jsRotate.type;
				}
				if (ThreeUtil.isNotNull(this.ngx3jsRotate.speed)) {
					this._roteteSpeed = this.ngx3jsRotate.speed;
				}
				if (ThreeUtil.isNotNull(this.ngx3jsRotate.funType)) {
					if (typeof this.ngx3jsRotate.funType === 'string') {

					} else {
						this._roteteFunction = this.ngx3jsRotate.funType;
					}
				}
			}
		}
	}

	private _roteteType: string = 'xyz';
	private _roteteSpeed: number = 0.1;
	private _roteteFunction : ScaleFunction = null;
	update(timer: RendererTimer) {
		if (ThreeUtil.isNotNull(this._roteteType) && this._roteteType !== 'none') {
			super.update(timer);
			const rotation = this.object3d.rotation;
			const roteteSpeed = timer.delta * this._roteteSpeed;
			switch (this._roteteType) {
				case 'function' :
					if (this._roteteFunction !== null) {
						this._roteteFunction(this.object3d, this.elapsedTime, timer);
					}
					break;
				case 'x':
					rotation.x += roteteSpeed;
					break;
				case 'y':
					rotation.y += roteteSpeed;
					break;
				case 'z':
					rotation.z += roteteSpeed;
					break;
				case 'xy':
					rotation.x += roteteSpeed;
					rotation.y += roteteSpeed;
					break;
				case 'xz':
					rotation.x += roteteSpeed;
					rotation.z += roteteSpeed;
					break;
				case 'yz':
					rotation.y += roteteSpeed;
					rotation.z += roteteSpeed;
					break;
				case 'xyz':
					rotation.x += roteteSpeed;
					rotation.y += roteteSpeed;
					rotation.z += roteteSpeed;
					break;
			}
		}
	}
}
