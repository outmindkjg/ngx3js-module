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
 * Position options
 */
 export interface PositionOptions {
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
 * Position Directive
 *
 * @example
 * ```html
 *  <ngx3js-mesh [ngx3jsPosition]="{ type : 'xyz', speed : 0.1,  yoyo : true, min : 0, max : 1 }"></ngx3js-mesh>
 * ```
 *
 */
@Directive({
	selector: '[ngx3jsPosition]',
	providers: [
		{
			provide: AbstractThreeDirective,
			multi : true,
			useExisting: forwardRef(() => PositionDirective),
		},
	],
})
export class PositionDirective
	extends AbstractObject3dDirective
	implements OnChanges
{
	/**
	 * Input  of position directive
	 */
	@Input('ngx3jsPosition') public ngx3jsPosition:
		| PositionOptions
		| Object3dFunction
		| string = 'xyz';

	/**
	 * Creates an instance of position directive.
	 * 
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
		if (changes.ngx3jsPosition && ThreeUtil.isNotNull(this.ngx3jsPosition)) {
			const options: PositionOptions = {
				type: null,
				yoyo: true,
				min: 0,
				max: 1,
				speed: 0.1,
			};
			if (typeof this.ngx3jsPosition === 'string') {
				switch (this.ngx3jsPosition) {
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
						options.type = this.ngx3jsPosition;
						break;
					default:
						const [type, speed, yoyo, min, max] = (
							this.ngx3jsPosition + ':0.1:true:0:1'
						).split(':');
						options.type = type;
						options.yoyo = yoyo === 'true' || yoyo === 'yes' ? true : false;
						options.speed = parseFloat(speed) || 0.1;
						options.min = parseFloat(min) || 0;
						options.max = parseFloat(max) || 1;
						break;
				}
			} else if (typeof this.ngx3jsPosition === 'function') {
				this.setObject3dFunction(this.ngx3jsPosition);
			} else {
				if (ThreeUtil.isNotNull(this.ngx3jsPosition.type)) {
					options.type = this.ngx3jsPosition.type;
				}
				if (ThreeUtil.isNotNull(this.ngx3jsPosition.speed)) {
					options.speed = this.ngx3jsPosition.speed;
				}
				if (ThreeUtil.isNotNull(this.ngx3jsPosition.yoyo)) {
					options.yoyo = this.ngx3jsPosition.yoyo;
				}
				if (ThreeUtil.isNotNull(this.ngx3jsPosition.min)) {
					options.min = this.ngx3jsPosition.min;
				}
				if (ThreeUtil.isNotNull(this.ngx3jsPosition.max)) {
					options.max = this.ngx3jsPosition.max;
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
								object3d.position.x += deltaValue;
								if (
									yoyo &&
									((direction > 0 && object3d.position.x > max) ||
										(direction < 0 && object3d.position.x < min))
								) {
									direction *= -1;
									object3d.position.x = Math.min(
										Math.max(object3d.position.x, min),
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
								object3d.position.y += deltaValue;
								if (
									yoyo &&
									((direction > 0 && object3d.position.y > max) ||
										(direction < 0 && object3d.position.y < min))
								) {
									direction *= -1;
									object3d.position.y = Math.min(
										Math.max(object3d.position.y, min),
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
								object3d.position.z += deltaValue;
								if (
									yoyo &&
									((direction > 0 && object3d.position.z > max) ||
										(direction < 0 && object3d.position.z < min))
								) {
									direction *= -1;
									object3d.position.z = Math.min(
										Math.max(object3d.position.z, min),
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
								object3d.position.x += deltaValue;
								object3d.position.y += deltaValue;
								if (
									yoyo &&
									((direction > 0 && object3d.position.x > max) ||
										(direction < 0 && object3d.position.x < min))
								) {
									direction *= -1;
									object3d.position.x = Math.min(
										Math.max(object3d.position.x, min),
										max
									);
									object3d.position.y = Math.min(
										Math.max(object3d.position.y, min),
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
								object3d.position.x += deltaValue;
								object3d.position.z += deltaValue;
								if (
									yoyo &&
									((direction > 0 && object3d.position.x > max) ||
										(direction < 0 && object3d.position.x < min))
								) {
									direction *= -1;
									object3d.position.x = Math.min(
										Math.max(object3d.position.x, min),
										max
									);
									object3d.position.z = Math.min(
										Math.max(object3d.position.z, min),
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
								object3d.position.x += deltaValue;
								object3d.position.z += deltaValue;
								if (
									yoyo &&
									((direction > 0 && object3d.position.y > max) ||
										(direction < 0 && object3d.position.y < min))
								) {
									direction *= -1;
									object3d.position.y = Math.min(
										Math.max(object3d.position.y, min),
										max
									);
									object3d.position.z = Math.min(
										Math.max(object3d.position.z, min),
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
								object3d.position.x += deltaValue;
								object3d.position.y += deltaValue;
								object3d.position.z += deltaValue;
								if (
									yoyo &&
									((direction > 0 && object3d.position.x > max) ||
										(direction < 0 && object3d.position.x < min))
								) {
									direction *= -1;
									object3d.position.x = Math.min(
										Math.max(object3d.position.x, min),
										max
									);
									object3d.position.y = Math.min(
										Math.max(object3d.position.y, min),
										max
									);
									object3d.position.z = Math.min(
										Math.max(object3d.position.z, min),
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
