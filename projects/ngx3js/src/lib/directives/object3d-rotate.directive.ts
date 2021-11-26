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
	DirectiveOptions,
} from '../directive.abstract';
import { AbstractObject3dComponent } from '../object3d.abstract';
import { Object3dFunction } from '../directive.abstract';

/**
 * Rotate options
 */
export interface RotateOptions extends DirectiveOptions {}

/**
 * Rotate Directive
 *
 * See the [ngx3js docs](https://outmindkjg.github.io/ngx3js-doc/#/docs/ngxapi/en/RotateDirective) page for details.
 * See the [ngx directives](https://outmindkjg.github.io/ngx3js-doc/#/examples/ngx_directives) page for a live demo.
 *
 * ```html
 * <ngx3js-mesh [ngx3jsRotate]="{
 * 		type : 'xyz',
 * 		speed : 0.1,
 * 		easing : 'linearIn',
 * 		repeat : 'yoyo',
 * 		start : 0,
 * 		end : 360
 * }"></ngx3js-mesh>
 * ```
 *
 */
@Directive({
	selector: '[ngx3jsRotate]',
	providers: [
		{
			provide: AbstractThreeDirective,
			multi: true,
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
				easing: 'linearin',
				repeat: 'yoyo',
				start: 0,
				end: 360,
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
						break;
					default:
						const [type, speed, easing, repeat, start, end] = (
							this.ngx3jsRotate + ':0.1:linearin:yoyo:0:360'
						).split(':');
						options.type = type;
						options.speed = parseFloat(speed) || 0.1;
						options.easing = easing;
						options.repeat = repeat;
						options.start = parseFloat(start) || 0;
						options.end = parseFloat(end) || 1;
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
				if (ThreeUtil.isNotNull(this.ngx3jsRotate.easing)) {
					options.easing = this.ngx3jsRotate.easing;
				}
				if (ThreeUtil.isNotNull(this.ngx3jsRotate.repeat)) {
					options.repeat = this.ngx3jsRotate.repeat;
				}
				if (ThreeUtil.isNotNull(this.ngx3jsRotate.start)) {
					options.start = this.ngx3jsRotate.start;
				}
				if (ThreeUtil.isNotNull(this.ngx3jsRotate.end)) {
					options.end = this.ngx3jsRotate.end;
				}
			}
			if (options.type !== null) {
				let start = ThreeUtil.getAngleSafe(options.start, 0);
				let end = ThreeUtil.getAngleSafe(options.end, 360);

				const easing = this.getEasing(
					options.easing,
					options.speed || 0.1,
					options.repeat,
					start,
					end
				);

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
								const deltaValue = easing(timer.delta);
								object3d.rotation.x = deltaValue;
							}
						);
						break;
					case 'y':
						this.setObject3dFunction(
							(object3d: THREE.Object3D, _: number, timer: RendererTimer) => {
								const deltaValue = easing(timer.delta);
								object3d.rotation.y = deltaValue;
							}
						);
						break;
					case 'z':
						this.setObject3dFunction(
							(object3d: THREE.Object3D, _: number, timer: RendererTimer) => {
								const deltaValue = easing(timer.delta);
								object3d.rotation.z = deltaValue;
							}
						);
						break;
					case 'xy':
						this.setObject3dFunction(
							(object3d: THREE.Object3D, _: number, timer: RendererTimer) => {
								const deltaValue = easing(timer.delta);
								object3d.rotation.x = deltaValue;
								object3d.rotation.y = deltaValue;
							}
						);
						break;
					case 'xz':
						this.setObject3dFunction(
							(object3d: THREE.Object3D, _: number, timer: RendererTimer) => {
								const deltaValue = easing(timer.delta);
								object3d.rotation.x = deltaValue;
								object3d.rotation.z = deltaValue;
							}
						);
						break;
					case 'yz':
						this.setObject3dFunction(
							(object3d: THREE.Object3D, _: number, timer: RendererTimer) => {
								const deltaValue = easing(timer.delta);
								object3d.rotation.y = deltaValue;
								object3d.rotation.z = deltaValue;
							}
						);
						break;
					case 'xyz':
						this.setObject3dFunction(
							(object3d: THREE.Object3D, _: number, timer: RendererTimer) => {
								const deltaValue = easing(timer.delta);
								object3d.rotation.x = deltaValue;
								object3d.rotation.y = deltaValue;
								object3d.rotation.z = deltaValue;
							}
						);
						break;
				}
			}
		}
	}
}
