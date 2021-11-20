import {
	Directive,
	forwardRef,
	Input,
	OnChanges,
	SimpleChanges,
} from '@angular/core';
import { RendererTimer, ThreeUtil } from '../interface';
import {
	AbstractObject3dDirective,
	AbstractThreeDirective,
} from '../directive.abstract';
import { AbstractObject3dComponent } from '../object3d.abstract';
import { Object3dFunction } from '../directive.abstract';

/**
 * Scale options
 */
export interface ScaleOptions {
	/** type */
	type?: 'x' | 'y' | 'z' | 'xy' | 'xz' | 'yz' | 'xyz' | 'none' | string;

	/** yoyo */
	yoyo?: boolean;

	/** min */
	min?: number;

	/** max */
	max?: number;

	/** speed */
	speed?: number;
}

/**
 * Scale Directive
 *
 * @example
 * ```html
 *  <ngx3js-mesh [ngx3jsScale]="{ type : 'xyz', speed : 0.1,  yoyo : true, min : 0, max : 1 }"></ngx3js-mesh>
 * ```
 *
 */
@Directive({
	selector: '[ngx3jsScale]',
	providers: [
		{
			provide: AbstractThreeDirective,
			multi : true,
			useExisting: forwardRef(() => ScaleDirective),
		},
	],
})
export class ScaleDirective
	extends AbstractObject3dDirective
	implements OnChanges
{

	/**
	 * Input  of scale directive
	 */
	@Input('ngx3jsScale') public ngx3jsScale:
		| ScaleOptions
		| Object3dFunction
		| string = 'xyz';

	/**
	 * Creates an instance of scale directive.
	 * @param object3d 
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
		if (changes.ngx3jsScale && ThreeUtil.isNotNull(this.ngx3jsScale)) {
			const options: ScaleOptions = {
				type: null,
				yoyo: true,
				min: 0,
				max: 1,
				speed: 0.1,
			};
			if (typeof this.ngx3jsScale === 'string') {
				switch (this.ngx3jsScale) {
					case 'none':
					case 'pause':
					case 'stop':
					case 'play':
					case 'x':
					case 'y':
					case 'z':
					case 'xy':
					case 'xz':
					case 'yz':
					case 'xyz':
						options.type = this.ngx3jsScale;
						break;
					default:
						const [type, speed, yoyo, min, max] = (
							this.ngx3jsScale + ':0.1:true:0:1'
						).split(':');
						options.type = type;
						options.yoyo = yoyo === 'true' || yoyo === 'yes' ? true : false;
						options.speed = parseFloat(speed) || 0.1;
						options.min = parseFloat(min) || 0;
						options.max = parseFloat(max) || 1;
						break;
				}
			} else if (typeof this.ngx3jsScale === 'function') {
				this.setObject3dFunction(this.ngx3jsScale);
			} else {
				if (ThreeUtil.isNotNull(this.ngx3jsScale.type)) {
					options.type = this.ngx3jsScale.type;
				}
				if (ThreeUtil.isNotNull(this.ngx3jsScale.speed)) {
					options.speed = this.ngx3jsScale.speed;
				}
				if (ThreeUtil.isNotNull(this.ngx3jsScale.yoyo)) {
					options.yoyo = this.ngx3jsScale.yoyo;
				}
				if (ThreeUtil.isNotNull(this.ngx3jsScale.min)) {
					options.min = this.ngx3jsScale.min;
				}
				if (ThreeUtil.isNotNull(this.ngx3jsScale.max)) {
					options.max = this.ngx3jsScale.max;
				}
			}
			if (options.type !== null) {
				const speed = options.speed || 0.1;
				const yoyo = options.yoyo;
				const min = options.min;
				const max = options.max;
				let direction: number = 1;
				switch (options.type) {
					case 'none':
					case 'stop':
					case 'pause':
						this.pause();
						break;
					case 'play':
						this.play();
						break;
					case 'x':
						this.setObject3dFunction(
							(object3d: THREE.Object3D, _: number, timer: RendererTimer) => {
								const deltaValue = timer.delta * speed * direction;
								object3d.scale.x += deltaValue;
								if (
									yoyo &&
									((direction > 0 && object3d.scale.x > max) ||
										(direction < 0 && object3d.scale.x < min))
								) {
									direction *= -1;
									object3d.scale.x = Math.min(
										Math.max(object3d.scale.x, min),
										max
									);
								}
							}
						);
						break;
					case 'y':
						this.setObject3dFunction(
							(object3d: THREE.Object3D, _: number, timer: RendererTimer) => {
								const deltaValue = timer.delta * speed * direction;
								object3d.scale.y += deltaValue;
								if (
									yoyo &&
									((direction > 0 && object3d.scale.y > max) ||
										(direction < 0 && object3d.scale.y < min))
								) {
									direction *= -1;
									object3d.scale.y = Math.min(
										Math.max(object3d.scale.y, min),
										max
									);
								}
							}
						);
						break;
					case 'z':
						this.setObject3dFunction(
							(object3d: THREE.Object3D, _: number, timer: RendererTimer) => {
								const deltaValue = timer.delta * speed * direction;
								object3d.scale.z += deltaValue;
								if (
									yoyo &&
									((direction > 0 && object3d.scale.z > max) ||
										(direction < 0 && object3d.scale.z < min))
								) {
									direction *= -1;
									object3d.scale.z = Math.min(
										Math.max(object3d.scale.z, min),
										max
									);
								}
							}
						);
						break;
					case 'xy':
						this.setObject3dFunction(
							(object3d: THREE.Object3D, _: number, timer: RendererTimer) => {
								const deltaValue = timer.delta * speed * direction;
								object3d.scale.x += deltaValue;
								object3d.scale.y += deltaValue;
								if (
									yoyo &&
									((direction > 0 && object3d.scale.x > max) ||
										(direction < 0 && object3d.scale.x < min))
								) {
									direction *= -1;
									object3d.scale.x = Math.min(
										Math.max(object3d.scale.x, min),
										max
									);
									object3d.scale.y = Math.min(
										Math.max(object3d.scale.y, min),
										max
									);
								}
							}
						);
						break;
					case 'xz':
						this.setObject3dFunction(
							(object3d: THREE.Object3D, _: number, timer: RendererTimer) => {
								const deltaValue = timer.delta * speed * direction;
								object3d.scale.x += deltaValue;
								object3d.scale.z += deltaValue;
								if (
									yoyo &&
									((direction > 0 && object3d.scale.x > max) ||
										(direction < 0 && object3d.scale.x < min))
								) {
									direction *= -1;
									object3d.scale.x = Math.min(
										Math.max(object3d.scale.x, min),
										max
									);
									object3d.scale.z = Math.min(
										Math.max(object3d.scale.z, min),
										max
									);
								}
							}
						);
						break;
					case 'yz':
						this.setObject3dFunction(
							(object3d: THREE.Object3D, _: number, timer: RendererTimer) => {
								const deltaValue = timer.delta * speed * direction;
								object3d.scale.x += deltaValue;
								object3d.scale.z += deltaValue;
								if (
									yoyo &&
									((direction > 0 && object3d.scale.y > max) ||
										(direction < 0 && object3d.scale.y < min))
								) {
									direction *= -1;
									object3d.scale.y = Math.min(
										Math.max(object3d.scale.y, min),
										max
									);
									object3d.scale.z = Math.min(
										Math.max(object3d.scale.z, min),
										max
									);
								}
							}
						);
						break;
					case 'xyz':
						this.setObject3dFunction(
							(object3d: THREE.Object3D, _: number, timer: RendererTimer) => {
								const deltaValue = timer.delta * speed * direction;
								object3d.scale.x += deltaValue;
								object3d.scale.y += deltaValue;
								object3d.scale.z += deltaValue;
								if (
									yoyo &&
									((direction > 0 && object3d.scale.x > max) ||
										(direction < 0 && object3d.scale.x < min))
								) {
									direction *= -1;
									object3d.scale.x = Math.min(
										Math.max(object3d.scale.x, min),
										max
									);
									object3d.scale.y = Math.min(
										Math.max(object3d.scale.y, min),
										max
									);
									object3d.scale.z = Math.min(
										Math.max(object3d.scale.z, min),
										max
									);
								}
							}
						);
						break;
				}
			}
		}
	}
}
