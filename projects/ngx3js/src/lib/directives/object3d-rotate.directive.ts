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
 * Rotate options
 */
export interface RotateOptions {
	/** type */
	type?: 'x' | 'y' | 'z' | 'xy' | 'xz' | 'yz' | 'xyz' | 'none' | string;

	/** speed */
	speed?: number;
}

/**
 * Rotate Directive
 *
 * @example
 * ```html
 *  <ngx3js-mesh [ngx3jsRotate]="{ type : 'xyz', speed : 0.1 }"></ngx3js-mesh>
 * ```
 *
 */
@Directive({
	selector: '[ngx3jsRotate]',
	providers: [
		{
			provide: AbstractThreeDirective,
			multi : true,
			useExisting: forwardRef(() => RotateDirective),
		},
	],
})
export class RotateDirective
	extends AbstractObject3dDirective
	implements OnChanges
{
	/**
	 * Input  of rotate directive
	 */
	@Input('ngx3jsRotate') public ngx3jsRotate:
		| RotateOptions
		| Object3dFunction
		| string = 'xyz';

	/**
	 * Creates an instance of rotate directive.
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
		if (changes.ngx3jsRotate && ThreeUtil.isNotNull(this.ngx3jsRotate)) {
			const options: RotateOptions = {
				type: null,
				speed: 0.1,
			};
			if (typeof this.ngx3jsRotate === 'string') {
				switch (this.ngx3jsRotate) {
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
						options.type = this.ngx3jsRotate;
						options.speed = 0.1;
						break;
					default:
						const [type, speed] = (this.ngx3jsRotate + ':0.1:').split(':');
						options.type = type;
						options.speed = parseFloat(speed) || 0.1;
						break;
				}
			} else if (typeof this.ngx3jsRotate === 'function') {
				this.setObject3dFunction(this.ngx3jsRotate);
			} else {
				if (ThreeUtil.isNotNull(this.ngx3jsRotate.type)) {
					options.type = this.ngx3jsRotate.type;
				}
				if (ThreeUtil.isNotNull(this.ngx3jsRotate.speed)) {
					options.speed = this.ngx3jsRotate.speed;
				}
			}
			if (options.type !== null) {
				const speed = options.speed || 0.1;
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
								object3d.rotation.x += timer.delta * speed;
							}
						);
						break;
					case 'y':
						this.setObject3dFunction(
							(object3d: THREE.Object3D, _: number, timer: RendererTimer) => {
								object3d.rotation.y += timer.delta * speed;
							}
						);
						break;
					case 'z':
						this.setObject3dFunction(
							(object3d: THREE.Object3D, _: number, timer: RendererTimer) => {
								object3d.rotation.z += timer.delta * speed;
							}
						);
						break;
					case 'xy':
						this.setObject3dFunction(
							(object3d: THREE.Object3D, _: number, timer: RendererTimer) => {
								const deltaAngle = timer.delta * speed;
								object3d.rotation.x += deltaAngle;
								object3d.rotation.y += deltaAngle;
							}
						);
						break;
					case 'xz':
						this.setObject3dFunction(
							(object3d: THREE.Object3D, _: number, timer: RendererTimer) => {
								const deltaAngle = timer.delta * speed;
								object3d.rotation.x += deltaAngle;
								object3d.rotation.z += deltaAngle;
							}
						);
						break;
					case 'yz':
						this.setObject3dFunction(
							(object3d: THREE.Object3D, _: number, timer: RendererTimer) => {
								const deltaAngle = timer.delta * speed;
								object3d.rotation.y += deltaAngle;
								object3d.rotation.z += deltaAngle;
							}
						);
						break;
					case 'xyz':
						this.setObject3dFunction(
							(object3d: THREE.Object3D, _: number, timer: RendererTimer) => {
								const deltaAngle = timer.delta * speed;
								object3d.rotation.x += deltaAngle;
								object3d.rotation.y += deltaAngle;
								object3d.rotation.z += deltaAngle;
							}
						);
						break;
				}
			}
		}
	}
}
