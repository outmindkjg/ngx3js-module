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
 * Position options
 */
export interface PositionOptions extends DirectiveOptions {}

/**
 * Position Directive
 *
 * @example
 * ```html
 * <ngx3js-mesh [ngx3jsPosition]="{
 * 		type : 'xyz',
 * 		speed : 0.1,
 * 		easing : 'linearIn',
 * 		repeat : 'yoyo',
 * 		start : 0,
 * 		end : 1
 * }"></ngx3js-mesh>
 * ```
 *
 */
@Directive({
	selector: '[ngx3jsPosition]',
	providers: [
		{
			provide: AbstractThreeDirective,
			multi: true,
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
				easing: 'linearin',
				repeat: 'yoyo',
				start: 0,
				end: 1,
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
						const [type, speed, easing, repeat, start, end] = (
							this.ngx3jsPosition + ':0.1:linearin:yoyo:0:1'
						).split(':');
						options.type = type;
						options.speed = parseFloat(speed) || 0.1;
						options.easing = easing;
						options.repeat = repeat;
						options.start = parseFloat(start) || 0;
						options.end = parseFloat(end) || 1;
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
				if (ThreeUtil.isNotNull(this.ngx3jsPosition.easing)) {
					options.easing = this.ngx3jsPosition.easing;
				}
				if (ThreeUtil.isNotNull(this.ngx3jsPosition.repeat)) {
					options.repeat = this.ngx3jsPosition.repeat;
				}
				if (ThreeUtil.isNotNull(this.ngx3jsPosition.start)) {
					options.start = this.ngx3jsPosition.start;
				}
				if (ThreeUtil.isNotNull(this.ngx3jsPosition.end)) {
					options.end = this.ngx3jsPosition.end;
				}
			}
			if (options.type !== null) {
				const easing = this.getEasing(
					options.easing,
					options.speed || 0.1,
					options.repeat,
					options.start,
					options.end
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
								object3d.position.x = deltaValue;
							}
						);
						break;
					case 'y':
						this.setObject3dFunction(
							(object3d: THREE.Object3D, _: number, timer: RendererTimer) => {
								const deltaValue = easing(timer.delta);
								object3d.position.y = deltaValue;
							}
						);
						break;
					case 'z':
						this.setObject3dFunction(
							(object3d: THREE.Object3D, _: number, timer: RendererTimer) => {
								const deltaValue = easing(timer.delta);
								object3d.position.z = deltaValue;
							}
						);
						break;
					case 'xy':
						this.setObject3dFunction(
							(object3d: THREE.Object3D, _: number, timer: RendererTimer) => {
								const deltaValue = easing(timer.delta);
								object3d.position.x = deltaValue;
								object3d.position.y = deltaValue;
							}
						);
						break;
					case 'xz':
						this.setObject3dFunction(
							(object3d: THREE.Object3D, _: number, timer: RendererTimer) => {
								const deltaValue = easing(timer.delta);
								object3d.position.x = deltaValue;
								object3d.position.z = deltaValue;
							}
						);
						break;
					case 'yz':
						this.setObject3dFunction(
							(object3d: THREE.Object3D, _: number, timer: RendererTimer) => {
								const deltaValue = easing(timer.delta);
								object3d.position.y = deltaValue;
								object3d.position.z = deltaValue;
							}
						);
						break;
					case 'xyz':
						this.setObject3dFunction(
							(object3d: THREE.Object3D, _: number, timer: RendererTimer) => {
								const deltaValue = easing(timer.delta);
								object3d.position.x = deltaValue;
								object3d.position.y = deltaValue;
								object3d.position.z = deltaValue;
							}
						);
						break;
				}
			}
		}
	}
}
